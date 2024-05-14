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
          <AlertDialogCancel className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction
            className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-3 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={() => deleteDistrict(name)}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DistrictDeleteDialog;
