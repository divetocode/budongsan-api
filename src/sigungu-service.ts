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

  private constructor(dataPath: string = "./sigungu.json") {
    this._dataPath = path.resolve(dataPath);
  }

  public static getInstance(): SigunguServiceClass {
    if (!SigunguServiceClass._instance) {
      SigunguServiceClass._instance = new SigunguServiceClass();
    }
    return SigunguServiceClass._instance;
  }

  private _loadDataSync(): T_Sido[] {
    if (!this._dataCache) {
      const raw = fs.readFileSync(this._dataPath, "utf8");
      this._dataCache = JSON.parse(raw) as T_Sido[];
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
