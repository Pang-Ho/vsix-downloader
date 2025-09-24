# VSIX Downloader

You needed a download button for the VScode extension plugin for offline environments! It was inconvenient when it disappeared, wasn't it? So, I created this Chrome extension.

Marketplace Visual Studio Code 확장의 VSIX 파일을 쉽게 다운로드할 수 있는 크롬 확장프로그램 입니다.

## 설치 방법

1. 깃허브에서 소스 코드 ZIP 다운로드
2. 압축 해제
3. Chrome 브라우저에서 `chrome://extensions/` 접속
4. **개발자 모드** 활성화
5. **압축 해제된 확장 프로그램 로드** → `vsix-downloader` 폴더 선택

## 사용 방법

- Marketplace extension 상세 페이지에 접속하면 우측 상단에 배너가 표시됩니다.
- 배너에서 원하는 버전을 선택 후 **VSIX 다운로드** 버튼을 누르면 파일이 `${extensionName}-${version}.vsix` 형태로 다운로드 됩니다.
- 배너 닫기 버튼(✕)을 눌러 숨길 수 있습니다.
- 확장 아이콘을 클릭해도 동일하게 배너가 표시됩니다.

![배너](https://github.com/user-attachments/assets/5d46c6b8-60ac-4bfc-b22f-d2ff7fda0f15)
