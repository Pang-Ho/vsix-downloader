(async function () {
  // Marketplace extension 상세 페이지가 아니면 종료
  if (!location.href.includes("marketplace.visualstudio.com/items")) return;

  const url = new URL(location.href);
  const itemName = url.searchParams.get("itemName") ?? "";
  if (!itemName) return;

  const dotIndex = itemName.indexOf(".");
  const publisher =
    dotIndex !== -1 ? itemName.substring(0, dotIndex) : itemName;
  const extensionName = dotIndex !== -1 ? itemName.substring(dotIndex + 1) : "";

  // 배너 생성 함수
  async function createBanner() {
    // 기존 배너 제거
    const existingBanner = document.getElementById("vsix-banner");
    if (existingBanner) existingBanner.remove();

    // 버전 목록 가져오기 (Marketplace API)
    const versions = await fetch(
      "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;api-version=3.0-preview.1",
        },
        body: JSON.stringify({
          filters: [
            {
              criteria: [
                { filterType: 7, value: `${publisher}.${extensionName}` },
              ],
            },
          ],
          flags: 103,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        try {
          return data.results[0].extensions[0].versions.map((v) => v.version);
        } catch {
          return [];
        }
      });

    // 중복 제거
    const uniqueVersions = Array.from(new Set(versions));

    // --- 배너 생성 ---
    const banner = document.createElement("div");
    banner.id = "vsix-banner";
    banner.style.position = "fixed";
    banner.style.top = "10px";
    banner.style.right = "10px";
    banner.style.background = "#2c2c2c";
    banner.style.color = "#fff";
    banner.style.padding = "12px 16px";
    banner.style.fontFamily = "sans-serif";
    banner.style.fontSize = "13px";
    banner.style.zIndex = "9999";
    banner.style.display = "flex";
    banner.style.flexDirection = "column";
    banner.style.alignItems = "flex-start";
    banner.style.borderRadius = "6px";
    banner.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

    // 메시지
    const message = document.createElement("div");
    message.textContent = `VSIX download available (${extensionName})`;
    message.style.marginBottom = "6px";

    // 버전 선택
    const versionSelect = document.createElement("select");
    versionSelect.style.marginBottom = "6px";
    versionSelect.style.padding = "4px 6px";
    versionSelect.style.width = "100%";

    if (uniqueVersions.length > 0) {
      uniqueVersions.forEach((ver) => {
        const opt = document.createElement("option");
        opt.value = ver;
        opt.textContent = ver;
        versionSelect.appendChild(opt);
      });
      versionSelect.value = uniqueVersions[0];
    } else {
      const opt = document.createElement("option");
      opt.textContent = "No versions found";
      versionSelect.appendChild(opt);
      versionSelect.disabled = true;
    }

    // 버튼 컨테이너 (flex row)
    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "flex-end";
    btnContainer.style.width = "100%";
    btnContainer.style.gap = "8px"; // 버튼 간격

    // 다운로드 버튼
    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download";
    downloadBtn.style.marginBottom = "6px";
    downloadBtn.style.padding = "6px 10px";
    downloadBtn.style.border = "none";
    downloadBtn.style.borderRadius = "4px";
    downloadBtn.style.background = "#4CAF50";
    downloadBtn.style.color = "#fff";
    downloadBtn.style.cursor = "pointer";
    downloadBtn.disabled = uniqueVersions.length === 0;

    downloadBtn.onclick = async () => {
      const version = versionSelect.value;
      const vsixUrl = `https://${publisher}.gallery.vsassets.io/_apis/public/gallery/publisher/${publisher}/extension/${extensionName}/${version}/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`;

      try {
        const res = await fetch(vsixUrl);
        if (!res.ok) throw new Error("download failed");

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${extensionName}-${version}.vsix`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error(err);
        alert("VSIX download failed 😢");
      }
    };

    // 닫기 버튼
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    // closeBtn.style.alignSelf = "flex-end";
    closeBtn.style.padding = "2px 6px";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "4px";
    closeBtn.style.background = "#ff4d4d";
    closeBtn.style.color = "#fff";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = () => banner.remove();

    btnContainer.appendChild(downloadBtn);
    btnContainer.appendChild(closeBtn);

    // 배너 조립
    banner.appendChild(message);
    banner.appendChild(versionSelect);
    banner.appendChild(btnContainer);
    document.body.appendChild(banner);
  }

  // 1️⃣ 페이지 로드 시 배너 자동 표시
  createBanner();

  // 2️⃣ background.js에서 아이콘 클릭 시 메시지 수신 → 배너 표시
  window.addEventListener("message", (event) => {
    if (event.data.type === "SHOW_VSIX_BANNER") {
      createBanner();
    }
  });
})();
