import fs from "fs";
import path from "path";

type Bjd = {
  bjd_code: string;
  bjd_name: string;
};

type Sigungu = {
  sigungu_name: string;
  sigungu_code: string;
  bjd_array?: Bjd[];
};

type Sido = {
  sido_name: string;
  sido_code: string;
  sigungu_array: Sigungu[];
};

type SigunguFlat = {
  sido_name: string;
  sido_code: string;
  sigungu_name: string;
  sigungu_code: string;
  bjd_array?: Bjd[];
};

type SigunguKeyType = "code" | "name";

export class SigunguServiceClass {
  private static _instance: SigunguServiceClass;
  private _dataCache: Sido[] | null = null;
  private _dataPath: string;

  private constructor(dataPath: string = "./sigungu.json") {
    this._dataPath = path.resolve(dataPath);
  }

  public static getInstance(): SigunguServiceClass {
    if (!SigunguServiceClass._instance) {
      SigunguServiceClass._instance = new SigunguServiceClass();
    }
    return SigunguServiceClass._instance;
  }

  private _loadDataSync(): Sido[] {
    if (!this._dataCache) {
      const raw = fs.readFileSync(this._dataPath, "utf8");
      this._dataCache = JSON.parse(raw) as Sido[];
    }
    return this._dataCache;
  }

  public getSigunguList(): SigunguFlat[] {
    const data = this._loadDataSync();
    return data.flatMap(({ sido_name, sido_code, sigungu_array }) =>
      sigungu_array.map(({ sigungu_name, sigungu_code, bjd_array }) => ({
        sido_name,
        sido_code,
        sigungu_name,
        sigungu_code,
        bjd_array,
      }))
    );
  }

  public getSigunguMap(keyType: SigunguKeyType = "code"): Map<string, Omit<SigunguFlat, "bjd_array">> {
    const list = this.getSigunguList();
    const map = new Map();

    list.forEach(({ sigungu_name, sigungu_code, sido_name, sido_code }) => {
      const key = keyType === "name" ? sigungu_name : sigungu_code;
      map.set(key, { sigungu_name, sigungu_code, sido_name, sido_code });
    });

    return map;
  }

  public getBjdList(): Bjd[] {
    const data = this._loadDataSync();
    return data.flatMap(({ sigungu_array }) =>
      sigungu_array.flatMap(({ bjd_array }) => bjd_array ?? [])
    );
  }

  public getBjdMapBySigungu(keyType: SigunguKeyType = "name"): Map<string, Bjd[]> {
    const list = this.getSigunguList();
    const map = new Map<string, Bjd[]>();

    list.forEach(({ sigungu_name, sigungu_code, bjd_array }) => {
      const key = keyType === "code" ? sigungu_code : sigungu_name;
      map.set(key, bjd_array ?? []);
    });

    return map;
  }
}


const SigunguService = SigunguServiceClass.getInstance();
export default SigunguService;
