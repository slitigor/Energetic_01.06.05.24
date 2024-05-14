import { useSubstationStore } from "@/data/stores/useSubstationStore";
import { Toaster } from "../ui/toaster";
import SubstationAddDialog from "./SubstationAddDialog";
import { useEffect } from "react";
import SubstationCard from "./SubstationCard";

const SubstationPage = () => {
  const [substationList, getAllStation] = useSubstationStore((state) => [
    state.substationList,
    state.getAllStation,
  ]);

  useEffect(() => {
    getAllStation();
  }, [getAllStation]);

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[20px] font-medium mb-2">Список ПС</h2>
        <SubstationAddDialog />
      </div>
      {substationList.length === 0 && <div>У вас пока нет ни одной ПС!</div>}
      <div className="grid grid-cols-3 gap-4">
        {substationList.length > 0 &&
          substationList.map((substation) => (
            <SubstationCard substation={substation} key={substation.id} />
          ))}
      </div>
      <Toaster />
    </section>
  );
};

export default SubstationPage;
