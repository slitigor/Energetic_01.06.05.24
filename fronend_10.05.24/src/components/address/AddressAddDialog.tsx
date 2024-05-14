import { useAddressStore } from "@/data/stores/useAddressStore";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

const AddAddressDialog = () => {
  const [createAddr] = useAddressStore((state) => [state.createAddr]);
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [isAddedDialog, setIsAddedDialog] = useState(false);

  const handleSaveClick = () => {
    if (zip && city && street) {
      createAddr({
        zip: zip,
        city: city,
        street: street,
      });
      setZip("");
      setCity("");
      setStreet("");
      toast({
        variant: "default",
        title: "Успешное сохранение!",
        description: "Адрес успешно добавлени в БД",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Заполните поля!",
        description: "Проверьте и заполните поля со звёздочкой",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Новый сотрудник"
          onClick={() => setIsAddedDialog(true)}
        >
          <span className="sr-only">Новыя подстанция</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {isAddedDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить адрес</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zip" className="text-right">
                Почтовый индекс
              </Label>
              <Input
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Населённый пункт
              </Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Улица, дом
              </Label>
              <Input
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                handleSaveClick();
                setIsAddedDialog(false);
              }}
            >
              Сохранить
            </Button>
            <DialogClose asChild>
              <Button onClick={() => setIsAddedDialog(false)}>Отмена</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddAddressDialog;
