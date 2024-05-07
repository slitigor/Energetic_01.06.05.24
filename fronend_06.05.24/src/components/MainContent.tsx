import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const MainContent = () => {
  return (
    <section className="flex flex-col gap-2">
      <nav>
        <Button variant={"outline"}>Главная</Button>
        <Button variant={"outline"}>Районы</Button>
        <Button variant={"outline"}>Подстанции</Button>
        <Button variant={"outline"}>Оборудование</Button>
      </nav>
      <Separator />
      <div>
        <h2 className="text-lg uppercase font-medium">Подзаголовок</h2>
        <p className="text-[14px] tracking-wide">
          Здесь будет находиться основной контент приложения
        </p>
      </div>
    </section>
  );
};

export default MainContent;
