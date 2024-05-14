import { ISubstation } from "@/data/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import SubstationEditDialog from "./SubstationEditDialog";
import SubstationDelDialog from "./SubstationDelDialog";

const SubstationCard = ({ substation }: { substation: ISubstation }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{substation.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label>Описание:</Label>
          <Textarea
            disabled={true}
            value={substation.sdesc ? substation.sdesc : ""}
          />
          <Label>РЭС:</Label>
          <div className="grid grid-cols-[80px_1fr] items-center gap-2">
            <Label className="text-right">Название</Label>
            <Input disabled={true} value={substation.district.name} />
            <Label className="text-right">Описание</Label>
            <Textarea disabled={true} value={substation.district.ddesc} />
            <Label className="text-right">Адрес</Label>
            <Input disabled={true} value={substation.district.address.zip} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <SubstationEditDialog substation={substation} />
        <SubstationDelDialog id={substation.id} />
      </CardFooter>
    </Card>
  );
};

export default SubstationCard;
