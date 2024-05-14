import { useDistrictStore } from "@/data/stores/useDistrictStore";
import { useSubstationStore } from "@/data/stores/useSubstationStore";
import { ISubstation } from "@/data/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
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
import { toast } from "../ui/use-toast";

const SubstationEditDialog = ({ substation }: { substation: ISubstation }) => {
  const [updateStation] = useSubstationStore((state) => [state.updateStation]);
  const [districtList, getAllDistrict] = useDistrictStore((state) => [
    state.districtList,
    state.getAllDistrict,
  ]);
  const [editStation, setEditStation] = useState<ISubstation>(substation);
  //   const [isEditDialog, setIsEditDialog] = useState(false);

  const handleValueChange = (name: string) => {
    const dstr = districtList.find((d) => d.name === name);
    if (dstr !== undefined) setEditStation({ ...editStation, district: dstr });
  };

  const handleSaveClick = () => {
    if (
      editStation.name &&
      editStation.district !== undefined &&
      editStation.id !== undefined
    ) {
      updateStation(editStation.id, editStation);
      toast({
        title: "Изменение",
        description: "Данные успешно изменены.",
      });
    } else
      toast({
        variant: "destructive",
        title: "Ошибка заполнения",
        description: "Проверьте заполнение полей",
      });
  };

  useEffect(() => {
    getAllDistrict();
  }, [getAllDistrict]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <span className="sr-only">Добавить ПС</span>
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
          <Label htmlFor="namePS">Название ПС</Label>
          <Input
            id="namePS"
            value={editStation.name}
            onChange={(e) =>
              setEditStation({ ...editStation, name: e.target.value })
            }
          />
          <Label htmlFor="descr">Описание</Label>
          <Textarea
            id="descr"
            value={editStation.sdesc ? editStation.sdesc : ""}
            onChange={(e) =>
              setEditStation({ ...editStation, sdesc: e.target.value })
            }
          />
          <Label>Район электросетей</Label>
          <Select onValueChange={(e) => handleValueChange(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите РЭС" />
            </SelectTrigger>
            <SelectContent>
              {districtList.map((district) => (
                <SelectItem key={district.name} value={district.name}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} onClick={() => handleSaveClick()}>
              Сохранить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubstationEditDialog;
