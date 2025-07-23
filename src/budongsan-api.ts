import axios, { AxiosResponse } from 'axios';

type T_ApartmentInfo = {
  kaptCode: string;             // 아파트 고유 코드
  kaptName: string;             // 아파트 이름
  kaptAddr: string;             // 지번 주소
  codeSaleNm: string;           // 분양/임대 구분
  codeHeatNm: string;           // 난방 방식
  kaptTarea: number;            // 대지 면적 (㎡)
  kaptDongCnt: string;          // 동 수 (문자열로 제공됨)
  kaptdaCnt: number;            // 세대 수
  kaptBcompany: string;         // 시공사
  kaptAcompany: string;         // 조합/시행사
  kaptTel: string;              // 전화번호
  kaptUrl: string;              // 홈페이지 URL
  codeAptNm: string;            // 아파트 유형
  doroJuso: string;             // 도로명 주소
  codeMgrNm: string;            // 관리방식
  codeHallNm: string;           // 복도/계단식
  kaptUsedate: string;          // 사용 승인일 (yyyymmdd)
  kaptFax: string;              // 팩스 번호
  hoCnt: number;                // 호수 수
  kaptMarea: number;            // 연면적 (㎡)
  kaptMparea60: number;         // 전용 60㎡ 이하 세대 수
  kaptMparea85: number;         // 전용 60–85㎡ 세대 수
  kaptMparea135: number;        // 전용 85–135㎡ 세대 수
  kaptMparea136: number;        // 전용 135㎡ 초과 세대 수
  privArea: string;             // 세대별 전용 면적 합계 (㎡, 문자열로 제공)
  bjdCode: string;              // 법정동 코드
  kaptTopFloor: number;         // 최고 층
  ktownFlrNo: number;           // 층수 (동일)
  kaptBaseFloor: number;        // 지하 층수
  kaptdEcntp: number;           // 승강기 수
  zipcode: string;              // 우편번호
};

type T_ApartmentDetailInfo = {
  kaptCode: string;                  // 아파트 코드
  kaptName: string;                 // 아파트 이름
  codeMgr: string;                  // 관리 방식
  kaptMgrCnt: string;               // 관리 인원 수
  kaptCcompany: string;             // 관리회사
  codeSec: string;                  // 경비 방식
  kaptdScnt: string;                // 경비 인원 수
  kaptdSecCom: string;              // 경비 위탁 업체
  codeClean: string;                // 청소 방식
  kaptdClcnt: string;               // 청소 인원 수
  codeGarbage: string;              // 쓰레기 처리 방식
  codeDisinf: string;               // 소독 방식
  kaptdDcnt: string;                // 방역 인원 수
  disposalType: string;             // 소독 유형
  codeStr: string;                  // 구조
  kaptdEcapa: string | number;      // 전기 용량 (kVA)
  codeEcon: string;                 // 전기 계약 종류
  codeEmgr: string;                 // 전기 책임자 유형
  codeFalarm: string;               // 화재경보 방식
  codeWsupply: string;              // 수도 공급 방식
  codeElev: string;                 // 엘리베이터 관리 방식
  kaptdEcnt: number;                // 엘리베이터 수
  kaptdPcnt: string;                // 기계식 주차 수
  kaptdPcntu: string;               // 자주식 주차 수
  codeNet: string;                  // 네트워크 설치 여부
  kaptdCccnt: string;               // CCTV 수
  welfareFacility: string;          // 복지/공용시설 정보
  kaptdWtimebus: string;            // 버스 접근 시간
  subwayLine: string;               // 인근 지하철 노선
  subwayStation: string;            // 인근 역명
  kaptdWtimesub: string;            // 지하철 접근 시간
  convenientFacility: string;       // 주변 편의시설
  educationFacility: string;        // 교육시설
  groundElChargerCnt: number;       // 지상 전기차 충전기 수
  undergroundElChargerCnt: number;  // 지하 전기차 충전기 수
};

type T_ApartmentSimpleInfo = {
  kaptCode: string;     // 아파트 코드
  kaptName: string;     // 아파트 이름
  bjdCode: string;      // 법정동 코드
  as1: string;          // 시/도
  as2: string;          // 시/군/구
  as3: string;          // 읍/면/동
  as4: string | null;   // 상세주소 (없을 수 있음)
};

type T_ApartmentTradeBasicInfo = {
  aptDong: number;               // 동 번호
  aptNm: string;                 // 아파트 이름
  buildYear: number;            // 건축 연도
  buyerGbn: string;             // 매수자 구분 (예: 개인, 법인)
  cdealDay: string;             // 계약일 (없을 수 있음)
  cdealType: string;            // 계약유형 (없을 수 있음)
  dealAmount: string;           // 거래금액 (문자열, 예: '139,950')
  dealDay: number;              // 거래일
  dealMonth: number;            // 거래월
  dealYear: number;             // 거래연도
  dealingGbn: string;           // 거래 구분 (예: 중개거래)
  estateAgentSggNm: string;     // 중개업소 소재 시군구명
  excluUseAr: number;           // 전용면적 (㎡)
  floor: number;                // 층수
  jibun: number;                // 지번
  landLeaseholdGbn: string;     // 토지 임대 여부 ('Y' | 'N')
  rgstDate: string;             // 등록일 ('yy.MM.dd' 형식)
  sggCd: number;                // 시군구 코드
  slerGbn: string;              // 매도인 구분 (예: 개인)
  umdNm: string;                // 읍면동 이름
};

type T_ApartmentTradeDetailInfo = {
  aptDong: number;               // 동 번호
  aptNm: string;                 // 아파트 이름
  aptSeq: string;               // 아파트 일련번호 (시군구코드-단지코드 형식)
  bonbun: string;               // 본번 (지번 앞자리)
  bubun: string;                // 부번 (지번 뒷자리)
  buildYear: number;            // 건축 연도
  buyerGbn: string;             // 매수자 구분
  cdealDay: string;             // 계약일 (공백 가능)
  cdealType: string;            // 계약유형 (공백 가능)
  dealAmount: string;           // 거래금액 (천원 단위, 쉼표 포함)
  dealDay: number;              // 거래일
  dealMonth: number;            // 거래월
  dealYear: number;             // 거래연도
  dealingGbn: string;           // 거래 구분 (예: 중개거래)
  estateAgentSggNm: string;     // 중개업소 소재 시군구
  excluUseAr: number;           // 전용면적 (㎡)
  floor: number;                // 층수
  jibun: number;                // 지번
  landCd: number;               // 토지 코드
  landLeaseholdGbn: string;     // 토지 임대 여부 ('Y' | 'N')
  rgstDate: string;             // 등록일 ('yy.MM.dd' 형식)
  roadNm: string;               // 도로명
  roadNmBonbun: string;         // 도로명 본번
  roadNmBubun: string;          // 도로명 부번
  roadNmCd: number;             // 도로명 코드
  roadNmSeq: string;            // 도로명 일련번호
  roadNmSggCd: number;          // 도로명 시군구코드
  roadNmbCd: number;            // 도로명지 번호코드
  sggCd: number;                // 시군구 코드
  slerGbn: string;              // 매도자 구분
  umdCd: number;                // 읍면동 코드
  umdNm: string;                // 읍면동 이름
}

type T_ApartmentRentInfo = {
  aptNm: string;             // 아파트 이름
  buildYear: number;         // 건축 연도
  contractTerm: string;      // 계약 기간 (공백 가능)
  contractType: string;      // 계약 유형 (예: 갱신, 신규 / 공백 가능)
  dealDay: number;           // 거래일
  dealMonth: number;         // 거래월
  dealYear: number;          // 거래연도
  deposit: string;           // 보증금 (문자열, 쉼표 포함)
  excluUseAr: number;        // 전용면적 (㎡)
  floor: number;             // 층수
  jibun: number;             // 지번
  monthlyRent: number;       // 월세
  preDeposit: string;        // 직전 계약 보증금 (공백 가능)
  preMonthlyRent: string;    // 직전 계약 월세 (공백 가능)
  sggCd: number;             // 시군구 코드
  umdNm: string;             // 읍면동 이름
  useRRRight: string;        // 전세권 설정 여부 (공백 가능)
};

type T_BrRecapTitleInfo = {
  rnum: number;                        // 결과 순번
  platPlc: string;                    // 대지 위치 (지번 주소)
  sigunguCd: string;                  // 시군구 코드
  bjdongCd: string;                   // 법정동 코드
  platGbCd: string;                   // 대지 구분 코드
  bun: string;                        // 본번
  ji: string;                         // 부번
  mgmBldrgstPk: number;              // 관리 건축물대장 PK
  regstrGbCd: string;                // 등록 구분 코드
  regstrGbCdNm: string;              // 등록 구분명 (예: 집합)
  regstrKindCd: string;              // 등록 종류 코드
  regstrKindCdNm: string;            // 등록 종류명 (예: 총괄표제부)
  newOldRegstrGbCd: string;          // 신구대장 구분 코드
  newOldRegstrGbCdNm: string;        // 신구대장 구분명
  newPlatPlc: string;                // 도로명 주소
  bldNm: string;                     // 건물명
  splotNm: string;                   // 특별부지명
  block: string;                     // 블록
  lot: string;                       // 로트
  bylotCnt: number;                  // 대지 수
  naRoadCd: string;                  // 도로명코드
  naBjdongCd: string;                // 새주소 법정동 코드
  naUgrndCd: string;                 // 지상/지하 코드
  naMainBun: string;                 // 새주소 본번
  naSubBun: string;                  // 새주소 부번
  platArea: number;                  // 대지면적 (㎡)
  archArea: number;                  // 건축면적 (㎡)
  bcRat: number;                     // 건폐율 (%)
  totArea: number;                   // 연면적 (㎡)
  vlRatEstmTotArea: number;         // 용적률 산정 연면적 (㎡)
  vlRat: number;                     // 용적률 (%)
  mainPurpsCd: string;              // 주용도 코드
  mainPurpsCdNm: string;            // 주용도명 (예: 공동주택)
  etcPurps: string;                 // 기타 용도
  hhldCnt: number;                  // 세대 수
  fmlyCnt: number;                  // 가구 수
  mainBldCnt: number;               // 주건축물 수
  atchBldCnt: number;               // 부속건축물 수
  atchBldArea: number;              // 부속건축물 연면적 (㎡)
  totPkngCnt: number;               // 총 주차대수
  indrMechUtcnt: number;            // 기계식 실내 주차대수
  indrMechArea: number;             // 기계식 실내 주차면적
  oudrMechUtcnt: number;            // 기계식 옥외 주차대수
  oudrMechArea: number;             // 기계식 옥외 주차면적
  indrAutoUtcnt: number;            // 자주식 실내 주차대수
  indrAutoArea: number;             // 자주식 실내 주차면적
  oudrAutoUtcnt: number;            // 자주식 옥외 주차대수
  oudrAutoArea: number;             // 자주식 옥외 주차면적
  pmsDay: string;                   // 허가일
  stcnsDay: string;                 // 착공일
  useAprDay: string;                // 사용승인일
  pmsnoYear: string;                // 허가번호 연도
  pmsnoKikCd: string;               // 허가기관 코드
  pmsnoKikCdNm: string;             // 허가기관명
  pmsnoGbCd: string;                // 허가 구분 코드
  pmsnoGbCdNm: string;              // 허가 구분명
  hoCnt: number;                    // 호수 수
  engrGrade: string;                // 에너지효율등급
  engrRat: number;                  // 에너지소요량
  engrEpi: number;                  // 에너지지표
  gnBldGrade: string;               // 녹색건축 인증 등급
  gnBldCert: number;                // 녹색건축 인증 점수
  itgBldGrade: string;              // 제로에너지건축물 등급
  itgBldCert: number;               // 제로에너지건축물 점수
  crtnDay: string;                  // 데이터 생성일 (yyyymmdd)
};

/**
 * BudongsanAPI는 국토교통부 아파트 공공데이터를 조회하는 클라이언트입니다.
 */
export class BudongsanAPIClass {
    private serviceKey: string;

    /**
    * BudongsanAPI 인스턴스를 생성합니다.
    * @param serviceKey 공공데이터 포털에서 발급받은 서비스 키
    */
    constructor(serviceKey: string) {
        this.serviceKey = serviceKey;
    }

    /**
     * 아파트 단지 기본 정보를 조회합니다.
     * @param kaptCode 아파트 단지 코드
     * @returns 단지 기본 정보 (object)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentBasicInfo(kaptCode: string): Promise<T_ApartmentInfo> {
        const url = `https://apis.data.go.kr/1613000/AptBasisInfoServiceV3/getAphusBassInfoV3?serviceKey=${this.serviceKey}&kaptCode=${kaptCode}`;
        return this.fetchAndExtract(url);
    }

    /**
     * 아파트 단지 상세 정보를 조회합니다.
     * @param kaptCode 아파트 단지 코드
     * @returns 단지 상세 정보 (object)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentDetailInfo(kaptCode: string): Promise<T_ApartmentDetailInfo> {
        const url = `https://apis.data.go.kr/1613000/AptBasisInfoServiceV3/getAphusDtlInfoV3?serviceKey=${this.serviceKey}&kaptCode=${kaptCode}`;
        return this.fetchAndExtract(url);
    }

    /**
     * 시군구 코드에 따른 아파트 단지 목록을 조회합니다.
     * @param sigunguCode 시군구 코드
     * @param numOfRows 페이지당 결과 수
     * @param pageNo 페이지 번호
     * @returns 단지 목록 (배열)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentList(sigunguCode: string, numOfRows: string = '10000', pageNo: string = '1'): Promise<T_ApartmentSimpleInfo | Array<T_ApartmentSimpleInfo>> {
        const url = `https://apis.data.go.kr/1613000/AptListService3/getSigunguAptList3?serviceKey=${this.serviceKey}&sigunguCode=${sigunguCode}&numOfRows=${numOfRows}&pageNo=${pageNo}`;
        return this.fetchAndExtract(url);
    }

    /**
     * 특정 거래 년월의 아파트 실거래가(기본)를 조회합니다.
     * @param sigunguCode 시군구 코드 (5자리)
     * @param DEAL_YMD 거래 년월 (YYYYMM)
     * @param numOfRows 페이지당 결과 수
     * @param pageNo 페이지 번호
     * @returns 실거래 정보 목록 (배열)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentTradeBasicList(sigunguCode: string, DEAL_YMD: string, numOfRows: string = '10000', pageNo: string = '1'): Promise<T_ApartmentTradeBasicInfo | Array<T_ApartmentSimpleInfo>> {
        const url = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade?serviceKey=${this.serviceKey}&LAWD_CD=${sigunguCode}&DEAL_YMD=${DEAL_YMD}&numOfRows=${numOfRows}&pageNo=${pageNo}`;
        return this.fetchAndExtract(url);
    }

    /**
     * 특정 거래 년월의 아파트 실거래가(상세)를 페이지 단위로 조회합니다.
     * @param sigunguCode 시군구 코드 (5자리)
     * @param DEAL_YMD 거래 년월 (YYYYMM)
     * @param numOfRows 페이지당 결과 수
     * @param pageNo 페이지 번호
     * @returns 실거래 상세 정보 목록 (배열)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentTradeDetailList(sigunguCode: string, DEAL_YMD: string, numOfRows: string = '10000', pageNo: string = '1'): Promise<T_ApartmentTradeDetailInfo | Array<T_ApartmentTradeDetailInfo>> {
        const url = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev?serviceKey=${this.serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&LAWD_CD=${sigunguCode}&DEAL_YMD=${DEAL_YMD}`;
        return this.fetchAndExtract(url);
    }

    /**
     * 특정 거래 년월의 아파트 전월세 정보를 조회합니다.
     * @param sigunguCode 시군구 코드 (5자리)
     * @param DEAL_YMD 거래 년월 (YYYYMM)
     * @param numOfRows 페이지당 결과 수
     * @param pageNo 페이지 번호
     * @returns 전월세 정보 목록 (배열)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentRentList(sigunguCode: string, DEAL_YMD: string, numOfRows: string = '10000', pageNo: string = '1'): Promise<T_ApartmentRentInfo | Array<T_ApartmentRentInfo>> {
        const url = `https://apis.data.go.kr/1613000/RTMSDataSvcAptRent/getRTMSDataSvcAptRent?serviceKey=${this.serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&LAWD_CD=${sigunguCode}&DEAL_YMD=${DEAL_YMD}`;
        return this.fetchAndExtract(url);
    }

    /**
     * 건축물대장 총괄표제부 정보를 조회합니다.
     *
     * @param {string} sigunguCode - 시군구 코드 (예: '11710')
     * @param {string} bjdongCode - 법정동 코드 (예: '11200')
     * @param {string} bun - 번지 (예: '0138')
     * @param {string} ji - 지번 (예: '0000')
     * @param {string} [numOfRows="10"] - 페이지당 결과 수 (기본값: 10)
     * @param {string} [pageNo="1"] - 페이지 번호 (기본값: 1)
     * @returns {Promise<any>} 건축물대장 총괄표제부 API 응답 데이터
     */
    async getBrRecapTitleList(sigunguCode: string, bjdongCode: string, bun: string, ji: string, numOfRows: string = "10", pageNo: string = "1"): Promise<T_BrRecapTitleInfo | Array<T_BrRecapTitleInfo>> {
        const baseUrl = "https://apis.data.go.kr/1613000/BldRgstHubService/getBrRecapTitleInfo";
        const url = `${baseUrl}?serviceKey=${this.serviceKey}&sigunguCd=${sigunguCode}&bjdongCd=${bjdongCode}&platGbCd=0&bun=${bun}&ji=${ji}&startDate=19800101&endDate=20301231&_type=json&numOfRows=${numOfRows}&pageNo=${pageNo}`;
        return this.fetchAndExtract(url);
    }
    /**
     * 공통 fetch 및 응답 처리 로직
     */
    private async fetchAndExtract(url: string): Promise<any> {
        try {
            const res: AxiosResponse<any> = await axios.get(url);
            const { header, body } = res.data.response;

            if (header.resultCode === '00' || header.resultCode === '000') {
                return body?.items?.item || body?.item || body?.items;
            } else {
                throw new Error(`API Error: ${header.resultMsg} (code: ${header.resultCode})`);
            }

        } catch (error: any) {
            // 네트워크 오류 혹은 API 오류
            if (axios.isAxiosError(error)) {
                throw new Error(`Network Error: ${error.message}`);
            }
            throw error;
        }
    }
}

