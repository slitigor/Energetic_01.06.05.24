import {
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil, Save } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IDistrict } from "@/data/types";
import { useAddressStore } from "@/data/stores/useAddressStore";
import { useEffect, useState } from "react";
import { useDistrictStore } from "@/data/stores/useDistrictStore";
import { toast } from "../ui/use-toast";

const DistrictEditDialog = ({ district }: { district: IDistrict }) => {
  const [updateDistrict] = useDistrictStore((state) => [state.updateDistrict]);
  const [addressList, getAllAddr] = useAddressStore((state) => [
    state.addressList,
    state.getAllAddr,
  ]);
  const [editDistrict, setEditDistrict] = useState<IDistrict>(district);

  const hanleChangeAddress = (zip: string) => {
    const addr = addressList.find((a) => a.zip === zip);
    if (addr !== undefined) {
      setEditDistrict({ ...district, address: addr });
    }
  };

  const handleSaveClik = () => {
    if (editDistrict !== undefined && editDistrict.address !== undefined)
      updateDistrict(editDistrict.name, editDistrict);
    else
      toast({
        variant: "destructive",
        title: "Ошибка заполнения",
        description: "Проверьте и заполните поля со звёздочкой",
      });
  };

  useEffect(() => {
    getAllAddr();
  }, [getAllAddr]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
          <Label className="text-right">Название *</Label>
          <Input value={editDistrict.name} disabled={true} />
          <Label className="text-right">Описание</Label>
          <Textarea
            value={editDistrict.ddesc}
            onChange={(e) =>
              setEditDistrict({ ...editDistrict, ddesc: e.target.value })
            }
          />
          <Label className="text-right">Адрес *</Label>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} onClick={() => handleSaveClik()}>
              <Save className="w-4 h-4" />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DistrictEditDialog;
