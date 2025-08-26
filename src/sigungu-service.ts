import fs from "fs";
import path from "path";

type T_Bjd = {
  bjd_code: string;
  bjd_name: string;
};

type T_Sigungu = {
  sigungu_name: string;
  sigungu_code: string;
  bjd_array?: T_Bjd[];
};

type T_Sido = {
  sido_name: string;
  sido_code: string;
  sigungu_array: T_Sigungu[];
};

type T_SigunguFlat = {
  sido_name: string;
  sido_code: string;
  sigungu_name: string;
  sigungu_code: string;
  bjd_array?: T_Bjd[];
};

type T_SigunguKeyType = "code" | "name";

export class SigunguServiceClass {
  private static _instance: SigunguServiceClass;
  private _dataCache: T_Sido[] | null = null;
  private _dataPath: string;

  private constructor() {
    // node_modules/budongsan-api/dist/sigungu.json 경로 설정
    this._dataPath = this._getLibraryDataPath();
  }

  private _getLibraryDataPath(): string {
    // 1단계: 현재 모듈과 같은 폴더에서 sigungu.json 찾기
    const currentDir = __dirname; // ES2017에서도 안전하게 사용 가능

    // 현재 디렉토리에서 sigungu.json 찾기
    const localPath = path.join(currentDir, 'sigungu.json');
    if (fs.existsSync(localPath)) {
      return localPath;
    }

    // 2단계: node_modules/budongsan-api/dist/sigungu.json 찾기
    try {
      const packageMainPath = require.resolve('budongsan-api');
      const packageDir = path.dirname(packageMainPath);
      const packageDataPath = path.join(packageDir, 'sigungu.json');
      
      if (fs.existsSync(packageDataPath)) {
        return packageDataPath;
      }
    } catch (error) {
      // budongsan-api 패키지가 설치되지 않은 경우
    }

    // 3단계: 모든 경로에서 찾지 못한 경우 에러용 경로 반환
    return localPath; // 첫 번째 시도한 경로를 반환 (에러 메시지용)
  }

  public static getInstance(): SigunguServiceClass {
    if (!SigunguServiceClass._instance) {
      SigunguServiceClass._instance = new SigunguServiceClass();
    }
    return SigunguServiceClass._instance;
  }

  private _loadDataSync(): T_Sido[] {
    if (!this._dataCache) {
      try {
        const raw = fs.readFileSync(this._dataPath, "utf8");
        this._dataCache = JSON.parse(raw) as T_Sido[];
      } catch (error) {
        // 상세한 에러 메시지 제공
        let errorMessage = `sigungu.json 파일을 찾을 수 없습니다.\n\n`;
        errorMessage += `시도한 경로들:\n`;
        
        // 1. 로컬 경로 확인
        const currentDir = __dirname;
        const localPath = path.join(currentDir, 'sigungu.json');
        errorMessage += `1. 로컬 경로: ${localPath} - ${fs.existsSync(localPath) ? '존재함' : '존재하지 않음'}\n`;
        
        // 2. 패키지 경로 확인
        try {
          const packageMainPath = require.resolve('budongsan-api');
          const packageDir = path.dirname(packageMainPath);
          const packageDataPath = path.join(packageDir, 'sigungu.json');
          errorMessage += `2. 패키지 경로: ${packageDataPath} - ${fs.existsSync(packageDataPath) ? '존재함' : '존재하지 않음'}\n`;
        } catch (packageError) {
          errorMessage += `2. 패키지 경로: budongsan-api 패키지를 찾을 수 없음\n`;
        }
        
        errorMessage += `\n해결 방법:\n`;
        errorMessage += `- sigungu.json 파일을 라이브러리와 같은 폴더에 배치하거나\n`;
        errorMessage += `- npm install budongsan-api로 패키지를 설치하고 dist 폴더에 sigungu.json이 포함되어 있는지 확인하세요`;
        
        throw new Error(errorMessage);
      }
    }
    return this._dataCache;
  }

  public getSigunguList(): T_SigunguFlat[] {
    const data = this._loadDataSync();
    return data.flatMap(({ sido_name, sido_code, sigungu_array }) =>
      sigungu_array.map(({ sigungu_name, sigungu_code, bjd_array }) => ({
        sido_name,
        sido_code,
        sigungu_name,
        sigungu_code,
        // bjd_array,
      }))
    );
  }

  public getSigunguMap(keyType: T_SigunguKeyType = "code"): Map<string, Omit<T_SigunguFlat, "bjd_array">> {
    const list = this.getSigunguList();
    const map = new Map();

    list.forEach(({ sigungu_name, sigungu_code, sido_name, sido_code }) => {
      const key = keyType === "name" ? sigungu_name : sigungu_code;
      map.set(key, { sigungu_name, sigungu_code, sido_name, sido_code });
    });

    return map;
  }

  public getBjdList(): T_Bjd[] {
    const data = this._loadDataSync();
    return data.flatMap(({ sigungu_array }) =>
      sigungu_array.flatMap(({ bjd_array }) => bjd_array ?? [])
    );
  }

  public getBjdMapBySigungu(keyType: T_SigunguKeyType = "name"): Map<string, T_Bjd[]> {
    const list = this.getSigunguList();
    const map = new Map<string, T_Bjd[]>();

    list.forEach(({ sigungu_name, sigungu_code, bjd_array }) => {
      const key = keyType === "code" ? sigungu_code : sigungu_name;
      map.set(key, bjd_array ?? []);
    });

    return map;
  }
}

const SigunguService = SigunguServiceClass.getInstance();
export default SigunguService;