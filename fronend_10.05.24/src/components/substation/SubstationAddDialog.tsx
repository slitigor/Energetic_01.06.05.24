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
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useDistrictStore } from "@/data/stores/useDistrictStore";
import { IDistrict } from "@/data/types";
import { useSubstationStore } from "@/data/stores/useSubstationStore";
import { toast } from "../ui/use-toast";

const SubstationAddDialog = () => {
  const [createStation] = useSubstationStore((state) => [state.createStation]);
  const [districtList, getAllDistrict] = useDistrictStore((state) => [
    state.districtList,
    state.getAllDistrict,
  ]);
  const [isAddedDialog, setIsAddedDialog] = useState(false);
  const [name, setName] = useState("");
  const [sdesc, setSDesc] = useState("");
  const [district, setDistrict] = useState<IDistrict>();

  const handleValueChange = (name: string) => {
    const dstr = districtList.find((d) => d.name === name);
    if (dstr !== undefined) setDistrict(dstr);
  };

  const handleSaveClick = () => {
    if (name && district !== undefined) {
      createStation({ name: name, sdesc: sdesc, district: district });
      setName(""), setSDesc(""), setDistrict(undefined);
      toast({
        title: "Добавление ПС",
        description: "Подстанция успешно добавлена в БД!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Ошибка добавления ПС",
        description:
          "Подстанция не добавлена в БД! Проверьте заполнение полей.",
      });
    }
  };

  useEffect(() => {
    getAllDistrict();
  }, [getAllDistrict]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={() => setIsAddedDialog(true)}>
          <span className="sr-only">Добавить ПС</span>
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      {isAddedDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавление ПС</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
            <Label htmlFor="namePS">Название ПС</Label>
            <Input
              id="namePS"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="descr">Описание</Label>
            <Textarea
              id="descr"
              value={sdesc}
              onChange={(e) => setSDesc(e.target.value)}
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

export default SubstationAddDialog;
