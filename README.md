# 🏘️ BudongsanAPI

> 국토교통부 공공데이터 포털의 아파트 단지 정보, 실거래가, 전월세 데이터를 간편하게 조회할 수 있는 TypeScript 기반 API 클라이언트입니다.

---

## ✨ 특징

- 아파트 단지 기본 및 상세 정보 조회
- 실거래가(기본, 상세) 데이터 조회
- 전월세 거래 정보 조회
- Axios 기반 HTTP 클라이언트 사용
- TypeScript 지원 및 타입 안전성 보장
- 요청 실패 시 명확한 예외 처리

---
## 📦 설치

```bash
npm install budongsan-api
# 또는
yarn add budongsan-api
```


## 🚀 사용예제

```ts
import { BudongsanAPI } from 'budongsan-api'; // ESM
// or const { BudongsanAPI } = require('budongsan-api'); // CommonJS

// API 키는 공공데이터 포털에서 발급받은 서비스 키를 입력하세요.
const api = new BudongsanAPI('YOUR_SERVICE_KEY');

async function main() {
  try {
    // 아파트 단지 기본 정보 조회
    const info = await api.getApartmentBasicInfo('A10027364'); // '덕수궁롯데캐슬아파트'
    console.log('단지 정보:', info);
  } catch (error) {
    console.error('API 호출 실패:', error.message);
  }
}

main();
```


## 📘 지원 메서드

### 📌 아파트 단지 정보

| 메서드 | 설명 |
|--------|------|
| `getApartmentBasicInfo(complexCode: string)` | 단지 기본 정보 조회 |
| `getApartmentDetailInfo(complexCode: string)` | 단지 상세 정보 조회 |

### 📌 실거래가

| 메서드 | 설명 |
|--------|------|
| `getTradeData(complexCode: string)` | 실거래가 기본 데이터 조회 |
| `getTradeDetailData(complexCode: string)` | 실거래가 상세 데이터 조회 |

### 📌 전월세

| 메서드 | 설명 |
|--------|------|
| `getRentData(complexCode: string)` | 전월세 거래 정보 조회 |


## 🛠️ 요구 사항

- **Node.js 14 이상**  
  최신 Node.js 런타임 환경이 필요합니다.

- **API 키**  
  국토교통부 공공데이터 포털에서 발급받은 서비스 키를 사용해야 합니다.  
  👉 [공공데이터포털 바로가기](https://www.data.go.kr/)


## ❗ 예외 처리

모든 API 호출은 `try...catch` 구문을 통해 실패 시 명확한 예외 정보를 제공합니다.

- 오류 발생 시 `Error` 객체가 throw되며, `error.message`를 통해 상세 원인을 확인할 수 있습니다.

예외는 다음과 같은 경우에 발생할 수 있습니다:

- ❌ **잘못된 API 키**  
  인증되지 않은 키를 사용할 경우

- 🌐 **네트워크 오류**  
  서버 연결 실패, 응답 지연 등

- 🏢 **존재하지 않는 단지 코드**  
  유효하지 않은 단지 코드를 전달한 경우

- ⛔ **요청 제한 초과**  
  API 호출 횟수 제한을 초과했을 경우
