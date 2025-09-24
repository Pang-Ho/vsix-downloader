// 아이콘 클릭 시
chrome.action.onClicked.addListener((tab) => {
  if (!tab.url || !tab.url.includes("marketplace.visualstudio.com/items")) {
    alert("이 페이지에서는 VSIX 배너를 표시할 수 없습니다 ❌");
    return;
  }

  // content script 실행 후 배너 표시 명령
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: () => {
        // 기존 content.js의 배너 생성 함수 호출
        window.postMessage({ type: "SHOW_VSIX_BANNER" }, "*");
      },
    })
    .catch((err) => console.error("배너 실행 실패:", err));
});
