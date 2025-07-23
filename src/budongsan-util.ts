class BudongsanUtil {
  /**
   * 현재 한국 기준 연도와 월을 반환합니다.
   * @returns {{ year: string, month: string }}
   */
  static getKoreanYearMonth() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const koreaTime = new Date(utc + 9 * 60 * 60000);

    return {
      year: koreaTime.getFullYear().toString(),
      month: (koreaTime.getMonth() + 1).toString()
    };
  }

  /**
   * 시작 연월부터 종료 연월까지의 YYYYMM 문자열 배열을 생성합니다.
   * @param {number} startYear 시작 연도
   * @param {number} startMonth 시작 월
   * @param {number} endYear 종료 연도
   * @param {number} endMonth 종료 월
   * @returns {string[]} YYYYMM 문자열 배열
   */
  static generateDealYMDRange(startYear: number, startMonth: number, endYear: number, endMonth: number) {
    const result = [];
    let year = startYear;
    let month = startMonth;

    while (year < endYear || (year === endYear && month <= endMonth)) {
      const ymd = `${year}${month.toString().padStart(2, "0")}`;
      result.push(ymd);

      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }

    return result;
  }

  /**
   * 숫자 문자열을 한글 화폐 단위로 포맷팅합니다. (예: "55,000" → "5억 5000만")
   * @param {string|number} amount 원 단위 기준 숫자 또는 문자열
   * @returns {string} 한글 화폐 단위 문자열
   */
  static formatKoreanCurrency(amount: string | number): string {
    const unitMap = ['원', '만', '억', '조', '경', '해'];
    const isNegative = String(amount).startsWith('-');
    const numericStr = String(amount).replace(/[^0-9]/g, '') + '0000';

    const chunks = [];
    let temp = numericStr;
    while (temp.length > 0) {
      chunks.unshift(temp.slice(-4));
      temp = temp.slice(0, -4);
    }

    const parts = chunks.map((chunk, index) => {
      const num = parseInt(chunk, 10);
      if (num === 0) return null;
      return `${num}${unitMap[chunks.length - 1 - index]}`;
    }).filter(Boolean);

    const result = parts.join(' ');
    return isNegative ? `( -${result} )` : result;
  }
}

export default BudongsanUtil;
