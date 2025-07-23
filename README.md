# 🏘️ BudongsanAPI

> 국토교통부 공공데이터 포털의 아파트 단지 정보, 실거래가, 전월세 데이터를 간편하게 조회할 수 있는 TypeScript 기반 API 클라이언트입니다.
---

<br><br>

## ✨ 특징

- 아파트 단지 기본 및 상세 정보 조회
- 실거래가(기본, 상세) 데이터 조회
- 전월세 거래 정보 조회
- Axios 기반 HTTP 클라이언트 사용
- TypeScript 지원 및 타입 안전성 보장
- 요청 실패 시 명확한 예외 처리
---

<br><br>

## 📦 설치

```bash
npm install budongsan-api
# 또는
yarn add budongsan-api
```

<br><br>

## 🚀 사용예제
```ts
import { BudongsanAPIClass, SigunguService } from 'budongsan-api'; // ESM
// or const { BudongsanAPIClass, SigunguService } = require('budongsan-api'); // CommonJS

// API 키는 공공데이터 포털에서 발급받은 서비스 키를 입력하세요.
const budongsan_api = new BudongsanAPIClass('YOUR_SERVICE_KEY');

async function main() {
  try {
    // 아파트 단지 기본 정보 조회
    const info = await budongsan_api.getApartmentBasicInfo('A10027364'); // '덕수궁롯데캐슬아파트'
    console.log('단지 정보:', info);

    // 실거래가 조회 (서울 종로구, 2025년 5월 1페이지에서 10개 거래내역 가져옴)
    const priceList = await budongsan_api.getApartmentTradeDetail('1', '10', '11110', '202505'); 
    console.log('실거래가 정보:', priceList);

    // 전체 시군구 목록 조회
    const sigunguList = SigunguService.getSigunguList();
    console.log('시군구 목록:', sigunguList);
    /*
    [
      {
        sido_name: "서울",
        sido_code: "1",
        sigungu_name: "강남구",
        sigungu_code: "11680'",
        bjd_array: [...]
      },
      ...
    ]
    */
    // 시군구 Map (코드 또는 이름 기준)
    const mapByCode = SigunguService.getSigunguMap("code");
    console.log('강남구 정보:', mapByCode.get("11680"));

    const mapByName = SigunguService.getSigunguMap("name");
    console.log('강남구 정보:', mapByName.get("강남구"));

    // 전체 법정동 리스트
    const bjdList = SigunguService.getBjdList();
    console.log('법정동 목록:',bjdList);
    /*
    [
      { bjd_code: "10700", bjd_name: "신사동", sigungu_bjd_code: "1168010700" },
      ...
    ]
    */
  } catch (error) {
    console.error('API 호출 실패:', error.message);
  }
}

main();
```

<br><br>

## 📘 지원 메서드

<br>

### BudongsanAPIClass 클래스

#### 📌 아파트 단지 정보

| 메서드 | 설명 |
|--------|------|
| `getApartmentBasicInfo(kaptCode: string)` | 단지 기본 정보 조회 |
| `getApartmentDetailInfo(kaptCode: string)` | 단지 상세 정보 조회 |
| `getApartmentList(sigunguCode: string, pageNo: string, numOfRows: string)` | 아파트 단지 목록 조회 |

<br>

#### 📌 실거래가

| 메서드 | 설명 |
|--------|------|
| `getApartmentTradeBasic(LAWD_CD: string, DEAL_YMD: string)` | 실거래가 기본 데이터 조회 |
| `getApartmentTradeDetail(pageNo: string, numOfRows: string, LAWD_CD: string, DEAL_YMD: string)` | 실거래가 상세 데이터 조회 |

<br>

#### 📌 전월세

| 메서드 | 설명 |
|--------|------|
| `getApartmentRentInfo(LAWD_CD: string, DEAL_YMD: string)` | 전월세 거래 정보 조회 |

### SigunguService 인스턴스

#### 📌 시군구 정보

| 메서드                                        | 설명                                               |
| ------------------------------------------ | ------------------------------------------------ |
| `getSigunguList()`                         | 시도/시군구 목록을 평탄화된 배열로 반환                           |
| `getSigunguMap(keyType: "code" \| "name")` | 시군구 정보를 Map으로 반환 (`keyType`에 따라 시군구 코드 또는 이름 기준) |

#### 📌 법정동 정보 (BJD)

| 메서드                                             | 설명                                                      |
| ----------------------------------------------- | ------------------------------------------------------- |
| `getBjdList()`                                  | 모든 시군구에 포함된 법정동 목록을 평탄화된 배열로 반환                         |
| `getBjdMapBySigungu(keyType: "code" \| "name")` | 시군구별 법정동 배열을 Map 형태로 반환 (`keyType`에 따라 시군구 코드 또는 이름 기준) |

<br><br>

메서드 계속 추가 예정입니다!

<br><br>

## 🛠️ 요구 사항

- **Node.js 14 이상**  
  최신 Node.js 런타임 환경이 필요합니다.

- **API 키**  
  국토교통부 공공데이터 포털에서 발급받은 서비스 키를 사용해야 합니다.  
  👉 [공공데이터포털 바로가기](https://www.data.go.kr/)

<br><br>

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

<br><br>