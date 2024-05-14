import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { useAddressStore } from "@/data/stores/useAddressStore";
import { IAddress } from "@/data/types";
import { useDistrictStore } from "@/data/stores/useDistrictStore";
import { toast } from "../ui/use-toast";

const DistrictAddDialog = () => {
  const [addressList, getAllAddr] = useAddressStore((state) => [
    state.addressList,
    state.getAllAddr,
  ]);

  const [createDistrict] = useDistrictStore((state) => [state.createDistrict]);

  const [name, setName] = useState("");
  const [dDesc, setDDesc] = useState("");
  const [address, setAddress] = useState<IAddress>();
  const [isAddedDialog, setIsAddedDialog] = useState(false);

  const hanleChangeAddress = (zip: string) => {
    const addr = addressList.find((a) => a.zip === zip);
    if (addr !== undefined) setAddress(addr);
  };

  const handleClickSave = () => {
    if (name && address !== undefined) {
      createDistrict({
        name: name,
        ddesc: dDesc,
        address: address,
      });
      setName("");
      setDDesc("");
      setAddress(undefined);
    } else {
      toast({
        variant: "destructive",
        title: "Заполните поля!",
        description: "Проверьте и заполните поля со звёздочкой",
      });
    }
  };

  useEffect(() => {
    getAllAddr();
  }, [getAllAddr]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={() => setIsAddedDialog(true)}>
          <span className="sr-only">Добавить РЭС</span>
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      {isAddedDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавление РЭС</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
            <Label className="text-right">Название *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Label className="text-right">Описание</Label>
            <Textarea
              value={dDesc}
              onChange={(e) => setDDesc(e.target.value)}
            />
            <Label className="text-right">Адрес *</Label>
            <div className="flex gap-2 items-center">
              <Select onValueChange={(e) => hanleChangeAddress(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выбор адреса" />
                </SelectTrigger>
                <SelectContent>
                  {addressList.map((addr) => (
                    <SelectItem value={addr.zip} key={addr.zip}>
                      {addr.city}, {addr.street}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                handleClickSave();
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

export default DistrictAddDialog;
