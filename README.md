# VSIX Downloader

You needed a download button for the VS Code extension plugin for offline environments! It was inconvenient when it disappeared, wasn't it? So, I created this Chrome extension.

This Chrome extension allows you to easily download the VSIX file of Visual Studio Code extensions from the Marketplace.

폐쇄망에서 vs code 플러그인을 설치하기 위해 만든 크롬 확장 프로그램입니다.

VS Code 마켓에서 VSIX 파일을 다운로드 못하게 링크가 사라졌습니다. 그래서 다운로드할 수 있는 링크를 만들어, 다운로드 할 수 있도록 하는 크롬 확장 프로그램을 만들었습니다.

## Installation

1. Download the source code ZIP from GitHub [here](https://github.com/Pang-Ho/vsix-downloader/releases/download/1.0.0/vsix-downloader.zip)

2. Extract the ZIP file

3. Open Chrome and go to chrome://extensions/

4. Enable Developer mode

5. Click Load unpacked → select the vsix-downloader folder

## How to Use

- Go to the [VS Code Marketplace](https://marketplace.visualstudio.com/)
  extension page

- On the extension detail page, a banner appears at the top-right corner. Example

- Select the version you want from the banner and click Download VSIX. The file will be downloaded as ${extensionName}-${version}.vsix.

- Click the ✕ button to close the banner.
- Clicking the extension icon also shows the banner.

## 설치 방법

1. 깃허브에서 소스 코드 ZIP [다운로드](https://github.com/Pang-Ho/vsix-downloader/releases/download/1.0.0/vsix-downloader.zip)
2. 압축 해제
3. Chrome 브라우저에서 `chrome://extensions/` 접속
4. **개발자 모드** 활성화
5. **압축 해제된 확장 프로그램 로드** → `vsix-downloader` 폴더 선택

## 사용 방법

- [vscode market](https://marketplace.visualstudio.com/) 플러그인 설치 사이트로 이동
- Marketplace extension 상세 페이지에 접속하면 우측 상단에 배너가 표시됩니다. [예시](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- 배너에서 원하는 버전을 선택 후 **VSIX 다운로드** 버튼을 누르면 파일이 `${extensionName}-${version}.vsix` 형태로 다운로드 됩니다.
- 배너 닫기 버튼(✕)을 눌러 숨길 수 있습니다.
- 확장 아이콘을 클릭해도 동일하게 배너가 표시됩니다.

![배너](https://github.com/user-attachments/assets/5d46c6b8-60ac-4bfc-b22f-d2ff7fda0f15)
