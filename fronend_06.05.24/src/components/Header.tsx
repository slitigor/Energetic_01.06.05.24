import { ModeToggle } from "./ui/mode-toggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center h-[80px]">
      <div>logo</div>
      <div>Энергетик</div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        user
      </div>
    </header>
  );
};

export default Header;
