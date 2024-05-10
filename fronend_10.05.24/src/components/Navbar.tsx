import { Button } from "./ui/button";

const Navbar = ({ setTab }: { setTab: (arg: string) => void }) => {
  return (
    <nav>
      <Button variant={"outline"} onClick={() => setTab("main")}>
        Главная
      </Button>
      <Button variant={"outline"} onClick={() => setTab("district")}>
        Районы
      </Button>
      <Button variant={"outline"} onClick={() => setTab("substation")}>
        Подстанции
      </Button>
      <Button variant={"outline"} onClick={() => setTab("equipment")}>
        Оборудование
      </Button>
    </nav>
  );
};

export default Navbar;
