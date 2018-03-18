# coinone
CLI for coinone.co.kr

<img width="467" alt="screen shot 2018-03-18 at 5 20 26 pm" src="https://user-images.githubusercontent.com/836982/37564043-499109b8-2ad1-11e8-8fe8-20d9b903b8d8.png">

- 프로그램목적: 주로 쓰는 iTerm에서 브라우저를 띄우지않고 바로 조회하고, 거래하고, 분할매수하도록 돕습니다.
- 프로그램설명: 하단의 지원기능에 나열되어있습니다. Coinone v2 API 이용. 
    - 프론트 UI부분은 원래 만든 서비스(https://coin.soran.io) 가 있습니다.
    - 백엔드 부분을 포함하려고 했으나 (https://github.com/eces/coinone/issues/1) 
    - 요구한 부분(API 이용)에 더 충족하는 예제를 만들고자 CLI로 결정했습니다.
    - 일부 체결알림은 native notification 이용가능합니다. (https://github.com/mikaelbr/node-notifier)
    - 스크린샷 미리보기 (https://github.com/eces/coinone/issues/2)

### Usage

Requires node 8.0+.

`npm install -g coinone-cli`

##### 지원 기능

- `co`
- `co help` 도움말을 표시합니다.
- `co --version` (-V) 버전을 표시합니다.
- `co login` API키로 로그인합니다. 로컬에 저장되오니 보안에 유의에 주세요.
- `co whoami` 로그인된 계정을 확인합니다.
- `co xrp` 화폐 호가를 조회합니다.
- `co xrp bid 1000 --scale=100` KRW 예산에 맞도록 분할매수를 진행합니다.
- ~`co xrp orders` 주문을 조회합니다.~
- ~`co xrp cancel` 주문을 선택하여 취소합니다.~
- ~`co add slack` 슬랙 플러그인을 추가합니다.~
- ~`co remove slack` 슬랙 플러그인을 삭제합니다.~


### Development

- `npm i -g debugs`
- `npm i -g mocha`
- `npm test`


### Contiribution

- [Issues](https://github.com/eces/coinone/issues)