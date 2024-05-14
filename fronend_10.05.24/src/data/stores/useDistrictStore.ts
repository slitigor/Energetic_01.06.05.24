import { create } from "zustand";
import { IDistrict } from "../types";
import { appDB } from "../helper";

interface DistrictStore {
  districtList: IDistrict[];
  getAllDistrict: () => Promise<void>;
  createDistrict: (d: IDistrict) => Promise<void>;
  updateDistrict: (n: string, d: IDistrict) => Promise<void>;
  deleteDistrict: (n: string) => Promise<void>;
}

export const useDistrictStore = create<DistrictStore>()((set, get) => ({
  districtList: [],
  getAllDistrict: async () => {
    const r = await appDB.get("district");
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      districtList: r.data,
    });
  },
  createDistrict: async (d) => {
    const { districtList } = get();
    const r = await appDB.post("district", d);
    if (r.status !== 200 && r.status !== 201) throw new Error("Server Error!");
    set({
      districtList: [...districtList, r.data],
    });
  },
  updateDistrict: async (n, d) => {
    const { districtList } = get();
    const r = await appDB.put(`district/${n}`, d);
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      districtList: districtList.map((dstr) =>
        dstr.name === n ? r.data : dstr
      ),
    });
  },
  deleteDistrict: async (n) => {
    const { districtList } = get();
    const r = await appDB.put(`district/${n}`);
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      districtList: districtList.filter((dstr) => dstr.name !== n),
    });
  },
}));
