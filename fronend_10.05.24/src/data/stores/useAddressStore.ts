import { appDB } from "../helper";
import { IAddress } from "../types";
import { create } from "zustand";

interface AddressStore {
  addressList: IAddress[];
  getAllAddr: () => Promise<void>;
  createAddr: (a: IAddress) => Promise<void>;
  updateAddr: (z: string, a: IAddress) => Promise<void>;
  deleteAddr: (z: string) => Promise<void>;
}

export const useAddressStore = create<AddressStore>()((set, get) => ({
  addressList: [],
  getAllAddr: async () => {
    const r = await appDB.get("address");
    if (r.status !== 200) throw new Error("Server Error!");
    set({ addressList: r.data });
  },
  createAddr: async (a) => {
    const { addressList } = get();
    const r = await appDB.post("address", a);
    if (r.status !== 200 && r.status !== 201) throw new Error("Server Error!");
    set({
      addressList: [...addressList, r.data],
    });
  },
  updateAddr: async (z, a) => {
    const { addressList } = get();
    const r = await appDB.put(`address/${z}`, a);
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      addressList: addressList.map((addr) => (addr.zip === z ? r.data : addr)),
    });
  },
  deleteAddr: async (z) => {
    const { addressList } = get();
    const r = await appDB.delete(`address/${z}`);
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      addressList: addressList.filter((addr) => addr.zip !== z),
    });
  },
}));
