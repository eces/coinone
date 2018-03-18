# coinone
CLI for coinone.co.kr

(TODO: img)

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
- `co xrp ask 1000` KRW 예산에 맞도록 매수를 진행합니다.
- `co xrp orders` 주문을 조회합니다.
- `co xrp cancel` 주문을 선택하여 취소합니다.
- `co add slack` 슬랙 플러그인을 추가합니다.
- `co remove slack` 슬랙 플러그인을 삭제합니다.


### Development

- `npm i -g debugs`
- `npm i -g mocha`


### Contiribution

- [Issues](https://github.com/eces/coinone/issues)