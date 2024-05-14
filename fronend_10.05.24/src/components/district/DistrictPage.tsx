import { useDistrictStore } from "@/data/stores/useDistrictStore";
import { useEffect } from "react";

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
      <h2 className="text-[20px] font-medium">Список РЭС</h2>
      {districtList.length === 0 && <div>У вас пока нет ни одного РЭС!</div>}
    </section>
  );
};

export default DistrictPage;
