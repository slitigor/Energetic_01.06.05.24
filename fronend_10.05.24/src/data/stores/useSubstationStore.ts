import { create } from "zustand";
import { ISubstation } from "../types";
import { appDB } from "../helper";

interface SubstationStore {
  substationList: ISubstation[];
  getAllStation: () => Promise<void>;
  createStation: (s: ISubstation) => Promise<void>;
  updateStation: (id: number, s: ISubstation) => Promise<void>;
  deleteStation: (id: number) => Promise<void>;
}

export const useSubstationStore = create<SubstationStore>()((set, get) => ({
  substationList: [],
  getAllStation: async () => {
    try {
      const r = await appDB.get("substation");
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        substationList: r.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createStation: async (s) => {
    const { substationList } = get();
    try {
      const r = await appDB.post("substation", s);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        substationList: [...substationList, r.data],
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateStation: async (id, s) => {
    const { substationList } = get();
    try {
      const r = await appDB.put(`substation/${id}`, s);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        substationList: substationList.map((subst) =>
          subst.id === id ? r.data : subst
        ),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteStation: async (id) => {
    const { substationList } = get();
    try {
      const r = await appDB.delete(`substation/${id}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        substationList: substationList.filter((subst) => subst.id !== id),
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
