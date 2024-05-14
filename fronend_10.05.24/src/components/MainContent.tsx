import { useState } from "react";
import Navbar from "./Navbar";
import { Separator } from "./ui/separator";
import DistrictPage from "./district/DistrictPage";
import AddressPage from "./address/AddressPage";

const MainContent = () => {
  const [tab, setTab] = useState("main");

  return (
    <section className="flex flex-col gap-2">
      <Navbar setTab={setTab} />
      <Separator />
      {tab === "main" && (
        <div>
          <h2 className="text-[20px] font-medium">Главная страница</h2>
          <p>Краткое описание приложения, новости и т.п.</p>
        </div>
      )}
      {tab === "district" && <DistrictPage />}
      {tab === "address" && <AddressPage />}
      {tab === "substation" && (
        <div>
          <h2 className="text-[20px] font-medium">Список ПС</h2>
          <p>Здесь будет отображаться список подстанций</p>
        </div>
      )}
      {tab === "equipment" && (
        <div>
          <h2 className="text-[20px] font-medium">Оборудование</h2>
          <p>Здесь будет отображаться справочник оборудования</p>
        </div>
      )}
    </section>
  );
};

export default MainContent;
