import { IDistrict } from "@/data/types";
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
import DistrictEditDialog from "./DistrictEditDialog";
import DistrictDeleteDialog from "./DistrictDeleteDialog";

const DistrictCard = ({ district }: { district: IDistrict }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{district.name} РЭС</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label>Описание:</Label>
          <Textarea
            disabled={true}
            value={district.ddesc ? district.ddesc : ""}
          />
          <Label>Адрес:</Label>
          <div className="grid grid-cols-[80px_1fr] items-center gap-2">
            <Label className="text-right">Индекс</Label>
            <Input disabled={true} value={district.address.zip} />
            <Label className="text-right">Город</Label>
            <Input disabled={true} value={district.address.city} />
            <Label className="text-right">Улица</Label>
            <Input disabled={true} value={district.address.street} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <DistrictEditDialog district={district} />
        <DistrictDeleteDialog name={district.name} />
      </CardFooter>
    </Card>
  );
};

export default DistrictCard;
