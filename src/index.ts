import axios, { AxiosResponse } from 'axios';

/**
 * BudongsanAPI는 국토교통부 아파트 공공데이터를 조회하는 클라이언트입니다.
 */
export class BudongsanAPI {
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
    async getApartmentBasicInfo(kaptCode: string): Promise<any> {
        const url = `http://apis.data.go.kr/1613000/AptBasisInfoServiceV3/getAphusBassInfoV3`;
        return this.fetchAndExtract(url, { kaptCode });
    }

    /**
     * 아파트 단지 상세 정보를 조회합니다.
     * @param kaptCode 아파트 단지 코드
     * @returns 단지 상세 정보 (object)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentDetailInfo(kaptCode: string): Promise<any> {
        const url = `http://apis.data.go.kr/1613000/AptBasisInfoServiceV3/getAphusDtlInfoV3`;
        return this.fetchAndExtract(url, { kaptCode });
    }

    /**
     * 시군구 코드에 따른 아파트 단지 목록을 조회합니다.
     * @param sigunguCode 시군구 코드
     * @param pageNo 페이지 번호
     * @param numOfRows 페이지당 결과 수
     * @returns 단지 목록 (배열)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentList(sigunguCode: string, pageNo: string, numOfRows: string): Promise<any> {
        const url = `http://apis.data.go.kr/1613000/AptListService2/getSigunguAptList`;
        return this.fetchAndExtract(url, { sigunguCode, pageNo, numOfRows });
    }

    /**
     * 특정 거래 년월의 아파트 실거래가(기본)를 조회합니다.
     * @param LAWD_CD 법정동 코드 (5자리)
     * @param DEAL_YMD 거래 년월 (YYYYMM)
     * @returns 실거래 정보 목록 (배열)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentTradeBasic(LAWD_CD: string, DEAL_YMD: string): Promise<any> {
        const url = `http://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade`;
        return this.fetchAndExtract(url, { LAWD_CD, DEAL_YMD });
    }

    /**
     * 특정 거래 년월의 아파트 실거래가(상세)를 페이지 단위로 조회합니다.
     * @param pageNo 페이지 번호
     * @param numOfRows 페이지당 결과 수
     * @param LAWD_CD 법정동 코드 (5자리)
     * @param DEAL_YMD 거래 년월 (YYYYMM)
     * @returns 실거래 상세 정보 목록 (배열)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentTradeDetail(pageNo: string, numOfRows: string, LAWD_CD: string, DEAL_YMD: string): Promise<any> {
        const url = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev`;
        return this.fetchAndExtract(url, { pageNo, numOfRows, LAWD_CD, DEAL_YMD });
    }

    /**
     * 특정 거래 년월의 아파트 전월세 정보를 조회합니다.
     * @param LAWD_CD 법정동 코드 (5자리)
     * @param DEAL_YMD 거래 년월 (YYYYMM)
     * @returns 전월세 정보 목록 (배열)
     * @throws API 호출 실패 시 예외가 발생합니다.
     */
    async getApartmentRentInfo(LAWD_CD: string, DEAL_YMD: string): Promise<any> {
        const url = `https://apis.data.go.kr/1613000/RTMSDataSvcAptRent/getRTMSDataSvcAptRent`;
        return this.fetchAndExtract(url, { LAWD_CD, DEAL_YMD });
    }

    /**
     * 공통 fetch 및 응답 처리 로직
     */
    private async fetchAndExtract(url: string, params: Record<string, string>): Promise<any> {
        try {
            const res: AxiosResponse<any> = await axios.get(url, {
                params: {
                    serviceKey: this.serviceKey,
                    ...params,
                },
            });

            const { header, body } = res.data.response;

            if (header.resultCode === '00' || header.resultCode === '000') {
                return body?.items?.item || body?.item;
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

