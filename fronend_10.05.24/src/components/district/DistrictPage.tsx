import { useDistrictStore } from "@/data/stores/useDistrictStore";
import { useEffect } from "react";
import DistrictCard from "./DistrictCard";
import DistrictAddDialog from "./DistrictAddDialog";
import { Toaster } from "../ui/toaster";

const DistrictPage = () => {
  const [districtList, getAllDistrict] = useDistrictStore((state) => [
    state.districtList,
    state.getAllDistrict,
  ]);

  useEffect(() => {
    getAllDistrict();
  }, [getAllDistrict]);

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[20px] font-medium mb-2">Список РЭС</h2>
        <DistrictAddDialog />
      </div>
      {districtList.length === 0 && <div>У вас пока нет ни одного РЭС!</div>}
      <div className="grid grid-cols-3 gap-4">
        {districtList.length > 0 &&
          districtList.map((district) => (
            <DistrictCard district={district} key={district.name} />
          ))}
      </div>
      <Toaster />
    </section>
  );
};

export default DistrictPage;
