import { useDistrictStore } from "@/data/stores/useDistrictStore";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

const DistrictDeleteDialog = ({ name }: { name: string }) => {
  const [deleteDistrict] = useDistrictStore((state) => [state.deleteDistrict]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <Trash className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удаление</AlertDialogTitle>
          <AlertDialogDescription>
            Вы действительно хотите удалить {name} РЭС?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteDistrict(name)}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DistrictDeleteDialog;
