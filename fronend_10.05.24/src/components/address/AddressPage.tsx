import { useAddressStore } from "@/data/stores/useAddressStore";
import { Toaster } from "../ui/toaster";
import { useEffect } from "react";
import AddressAddDialog from "./AddressAddDialog";
import { DataTable } from "../ui/data-table";
import { Columns } from "./column";

const AddressPage = () => {
  const [addressList, getAllAddr] = useAddressStore((state) => [
    state.addressList,
    state.getAllAddr,
  ]);

  useEffect(() => {
    getAllAddr();
  }, [getAllAddr]);

  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] font-medium mb-2">Список подстанций</h2>
        <AddressAddDialog />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={Columns} data={addressList} />
      </div>
      <Toaster />
    </section>
  );
};

export default AddressPage;
