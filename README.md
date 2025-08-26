# 🏠 BudongsanAPI

> 국토교통부 공공데이터를 쉽고 빠르게! TypeScript로 만든 부동산 정보 조회 라이브러리

[![npm version](https://badge.fury.io/js/budongsan-api.svg)](https://www.npmjs.com/package/budongsan-api)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

---

## 🌟 주요 기능

- 📊 **아파트 단지 정보** - 기본/상세 정보를 한 번에
- 💰 **실거래가 조회** - 매매 거래 내역 (기본/상세)  
- 🏘️ **전월세 정보** - 임대차 거래 내역
- 🏗️ **건축물대장** - 총괄표제부 조회
- 🗺️ **지역 정보** - 전국 시군구/법정동 데이터
- ⚡ **완전한 TypeScript 지원** - 타입 안전성 보장
- 🛡️ **에러 핸들링** - 명확한 예외 처리

---

## 📦 설치하기

```bash
npm install budongsan-api
```

```bash
yarn add budongsan-api
```

---

## 🚀 빠른 시작

### 기본 사용법

```typescript
import { BudongsanAPIClass, BudongsanUtil, SigunguService } from 'budongsan-api';

// 🔑 공공데이터포털에서 발급받은 API 키를 입력하세요
const api = new BudongsanAPIClass('YOUR_SERVICE_KEY');

async function example() {
  try {
    // 🏢 아파트 단지 기본 정보
    const basicInfo = await api.getApartmentBasicInfo('A10027364');
    console.log('단지명:', basicInfo.kaptName);

    // 💰 실거래가 조회 (서울 강남구, 2024년 12월)
    const trades = await api.getApartmentTradeBasicList('11680', '202412');
    console.log('거래 건수:', trades.length);

    // 🏘️ 전월세 정보
    const rents = await api.getApartmentRentList('11680', '202412');
    console.log('임대차 거래:', rents.length);

  } catch (error) {
    console.error('❌ API 호출 실패:', error.message);
  }
}
```

---

## 📖 상세 사용 가이드

### 1️⃣ 아파트 단지 정보

```typescript
// 기본 정보 (이름, 주소, 세대수, 건설사 등)
const basicInfo = await api.getApartmentBasicInfo('A10027364');
console.log({
  단지명: basicInfo.kaptName,
  주소: basicInfo.kaptAddr,
  세대수: basicInfo.kaptdaCnt,
  건설사: basicInfo.kaptBcompany
});

// 상세 정보 (관리비, 편의시설, 교통 등)
const detailInfo = await api.getApartmentDetailInfo('A10027364');
console.log({
  관리방식: detailInfo.codeMgr,
  편의시설: detailInfo.convenientFacility,
  지하철접근: detailInfo.kaptdWtimesub
});

// 지역별 아파트 목록
const apartments = await api.getApartmentList('11680'); // 강남구
console.log('강남구 아파트:', apartments.length, '개');
```

### 2️⃣ 실거래가 정보

```typescript
// 기본 거래 정보
const basicTrades = await api.getApartmentTradeBasicList('11680', '202412');
basicTrades.forEach(trade => {
  console.log(`${trade.aptNm}: ${trade.dealAmount}만원 (${trade.excluUseAr}㎡)`);
});

// 상세 거래 정보 (도로명주소, 상세 지번 등 포함)
const detailTrades = await api.getApartmentTradeDetailList('11680', '202412');
detailTrades.forEach(trade => {
  console.log(`${trade.aptNm} - ${trade.roadNm} ${trade.roadNmBonbun}-${trade.roadNmBubun}`);
});
```

### 3️⃣ 전월세 정보

```typescript
const rents = await api.getApartmentRentList('11680', '202412');
rents.forEach(rent => {
  const deposit = BudongsanUtil.formatKoreanCurrency(rent.deposit);
  console.log(`${rent.aptNm}: 보증금 ${deposit}, 월세 ${rent.monthlyRent}만원`);
});
```

### 4️⃣ 건축물대장 조회

```typescript
// 건축물대장 총괄표제부
const building = await api.getBrRecapTitleList(
  '11710', // 송파구
  '11200', // 법정동코드  
  '0138',  // 번지
  '0000'   // 호수
);
console.log('건물명:', building.bldNm);
console.log('용도:', building.mainPurpsCdNm);
```

### 5️⃣ 지역 정보 활용

```typescript
// 📍 전국 시군구 목록
const sigunguList = SigunguService.getSigunguList();
console.log('총', sigunguList.length, '개 시군구');

// 🗺️ 시군구 코드로 검색
const mapByCode = SigunguService.getSigunguMap('code');
const gangnam = mapByCode.get('11680');
console.log(gangnam); // { sigungu_name: '강남구', sido_name: '서울' }

// 🏘️ 시군구명으로 검색  
const mapByName = SigunguService.getSigunguMap('name');
const gangnamByName = mapByName.get('강남구');
console.log(gangnamByName.sigungu_code); // '11680'

// 📋 전국 법정동 목록
const bjdList = SigunguService.getBjdList();
console.log('총', bjdList.length, '개 법정동');

// 🗃️ 시군구별 법정동
const bjdBySigungu = SigunguService.getBjdMapBySigungu('name');
const gangnamBjd = bjdBySigungu.get('강남구');
console.log('강남구 법정동:', gangnamBjd.map(bjd => bjd.bjd_name));
```

---

## 🛠️ 유틸리티 함수

### 날짜 및 화폐 처리

```typescript
// 📅 현재 한국 시간 기준 연월
const { year, month } = BudongsanUtil.getKoreanYearMonth();
console.log(`${year}년 ${month}월`); // 2025년 1월

// 📆 기간별 연월 생성
const months = BudongsanUtil.generateDealYMDRange(2024, 1, 2024, 12);
console.log(months); // ['202401', '202402', ..., '202412']

// 💰 한글 화폐 단위 변환
const price = BudongsanUtil.formatKoreanCurrency('55000');
console.log(price); // "5억 5000만 원"

const bigPrice = BudongsanUtil.formatKoreanCurrency('123456789');
console.log(bigPrice); // "12조 3456억 7890만 원"
```

### 지도 API 연동

```typescript
// 🗺️ 구글 지도 좌표 변환
const googleCoords = await BudongsanUtil.getGoogleMapLatitudeAndlongitude(
  '서울특별시 강남구 테헤란로 142',
  'YOUR_GOOGLE_API_KEY'
);
console.log(googleCoords); // { latitude: "37.5012767", longitude: "127.0396597" }

// 📍 카카오 지도 정보
const kakaoInfo = await BudongsanUtil.getKakaoMapPosition(
  '서울특별시 강남구 테헤란로 142',
  'YOUR_KAKAO_API_KEY'  
);
console.log(kakaoInfo.apartKakaoName); // 건물명

// 🏪 주변 시설 검색 (카카오)
const facilities = await BudongsanUtil.getKakaoCategory(
  37.5012767,    // 위도
  127.0396597,   // 경도  
  'MT1',         // 대형마트
  'YOUR_KAKAO_API_KEY'
);
console.log('주변 대형마트:', facilities.length, '개');
```

---

## 📋 API 메서드 전체 목록

### 🏢 BudongsanAPIClass

| 메서드 | 설명 | 매개변수 |
|--------|------|----------|
| `getApartmentBasicInfo()` | 아파트 기본정보 | `kaptCode` |
| `getApartmentDetailInfo()` | 아파트 상세정보 | `kaptCode` |
| `getApartmentList()` | 지역별 아파트목록 | `sigunguCode`, `numOfRows?`, `pageNo?` |
| `getApartmentTradeBasicList()` | 실거래가 기본 | `sigunguCode`, `DEAL_YMD`, `numOfRows?`, `pageNo?` |
| `getApartmentTradeDetailList()` | 실거래가 상세 | `sigunguCode`, `DEAL_YMD`, `numOfRows?`, `pageNo?` |
| `getApartmentRentList()` | 전월세 정보 | `sigunguCode`, `DEAL_YMD`, `numOfRows?`, `pageNo?` |
| `getBrRecapTitleList()` | 건축물대장 | `sigunguCode`, `bjdongCode`, `bun`, `ji`, `numOfRows?`, `pageNo?` |

### 🗺️ SigunguService

| 메서드 | 설명 | 반환타입 |
|--------|------|-----------|
| `getSigunguList()` | 전국 시군구 목록 | `T_SigunguFlat[]` |
| `getSigunguMap(keyType)` | 시군구 맵 | `Map<string, T_SigunguFlat>` |
| `getBjdList()` | 전국 법정동 목록 | `T_Bjd[]` |
| `getBjdMapBySigungu(keyType)` | 시군구별 법정동 맵 | `Map<string, T_Bjd[]>` |

### 🔧 BudongsanUtil

| 메서드 | 설명 |
|--------|------|
| `getKoreanYearMonth()` | 현재 한국 기준 연월 |
| `generateDealYMDRange()` | 기간별 연월 배열 생성 |
| `formatKoreanCurrency()` | 한글 화폐 단위 변환 |
| `getGoogleMapLatitudeAndlongitude()` | 구글 지도 좌표 변환 |
| `getKakaoMapPosition()` | 카카오 지도 정보 조회 |
| `getKakaoCategory()` | 카카오 주변 시설 검색 |

---

## 🎯 실전 활용 예제

### 특정 지역 시세 분석

```typescript
async function analyzeAreaPrice() {
  const api = new BudongsanAPIClass('YOUR_SERVICE_KEY');
  
  // 강남구 2024년 전체 거래 분석
  const months = BudongsanUtil.generateDealYMDRange(2024, 1, 2024, 12);
  const allTrades = [];
  
  for (const month of months) {
    const trades = await api.getApartmentTradeBasicList('11680', month);
    allTrades.push(...trades);
  }
  
  // 평균 거래가 계산
  const avgPrice = allTrades.reduce((sum, trade) => {
    return sum + parseInt(trade.dealAmount.replace(',', ''));
  }, 0) / allTrades.length;
  
  console.log('강남구 2024년 평균 거래가:', 
    BudongsanUtil.formatKoreanCurrency(avgPrice.toString())
  );
}
```

### 아파트 단지별 상세 리포트

```typescript
async function generateApartmentReport(kaptCode: string) {
  const api = new BudongsanAPIClass('YOUR_SERVICE_KEY');
  
  // 기본 정보
  const basic = await api.getApartmentBasicInfo(kaptCode);
  const detail = await api.getApartmentDetailInfo(kaptCode);
  
  // 위치 정보
  const location = await BudongsanUtil.getKakaoMapPosition(
    basic.doroJuso, 'YOUR_KAKAO_API_KEY'
  );
  
  // 주변 편의시설
  const marts = await BudongsanUtil.getKakaoCategory(
    location.latitude, location.longitude, 'MT1', 'YOUR_KAKAO_API_KEY'
  );
  
  console.log(`
📋 ${basic.kaptName} 단지 리포트
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏠 기본 정보
   • 주소: ${basic.doroJuso}
   • 세대수: ${basic.kaptdaCnt.toLocaleString()}세대
   • 건설사: ${basic.kaptBcompany}
   • 준공: ${basic.kaptUsedate}

🏪 편의시설
   • 주변 대형마트: ${marts.length}개
   • 지하철 접근: ${detail.kaptdWtimesub}
   
🚗 교통 정보  
   • 버스 접근: ${detail.kaptdWtimebus}
   • 지하철역: ${detail.subwayStation} (${detail.subwayLine})
  `);
}
```

---

## ⚙️ 환경 설정

### 필수 요구사항

- **Node.js 14.0.0 이상**
- **공공데이터포털 API 키**

### API 키 발급받기

1. [공공데이터포털](https://www.data.go.kr/) 회원가입
2. 다음 서비스 신청:
   - 아파트매매 실거래 상세 자료
   - 아파트 전월세 신고 조회 서비스  
   - 아파트 단지 정보 제공 서비스
   - 건축물대장 표제부 조회 서비스
3. 승인 후 발급받은 서비스 키 사용

### 환경변수 설정

```bash
# .env 파일
BUDONGSAN_API_KEY=your_service_key_here
GOOGLE_MAPS_API_KEY=your_google_key_here  
KAKAO_API_KEY=your_kakao_key_here
```

```typescript
// 환경변수 사용
const api = new BudongsanAPIClass(process.env.BUDONGSAN_API_KEY);
```

---

## 🚨 에러 처리 가이드

### 주요 에러 유형

```typescript
try {
  const result = await api.getApartmentBasicInfo('invalid_code');
} catch (error) {
  console.error('에러 타입:', error.message);
  
  // 에러별 처리
  if (error.message.includes('Network Error')) {
    console.log('🌐 네트워크 연결을 확인하세요');
  } else if (error.message.includes('API Error')) {
    console.log('🔑 API 키 또는 매개변수를 확인하세요');  
  }
}
```

### 일반적인 에러 상황

| 에러 메시지 | 원인 | 해결방법 |
|------------|------|----------|
| `Network Error` | 네트워크 연결 실패 | 인터넷 연결 확인 |
| `API Error: SERVICE KEY IS NOT REGISTERED` | 잘못된 API 키 | 공공데이터포털에서 키 재확인 |
| `API Error: NO_DATA` | 조회 결과 없음 | 매개변수 값 확인 |
| `API Error: LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS` | 호출 횟수 초과 | 잠시 후 재시도 |

---

## 🤝 기여하기

이 프로젝트에 기여하고 싶으시다면:

1. 이슈 등록 또는 기능 제안
2. Fork & Pull Request
3. 코드 리뷰 및 테스트

---

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

## 🔗 관련 링크

- [공공데이터포털](https://www.data.go.kr/)
- [국토교통부 실거래가 공개시스템](http://rtms.molit.go.kr/)  
- [카카오 지도 API](https://developers.kakao.com/docs/latest/ko/local/dev-guide)
- [구글 지도 API](https://developers.google.com/maps/documentation)

---

<div align="center">

**🏠 BudongsanAPI로 스마트한 부동산 데이터 분석을 시작하세요! 🚀**

[⭐ GitHub에서 Star 주기](https://github.com/divetocode/budongsan-api) | [📝 이슈 제보](https://github.com/divetocode/budongsan-api/issues) | [📚 더 많은 예제](https://github.com/divetocode/budongsan-api/examples)

</div>