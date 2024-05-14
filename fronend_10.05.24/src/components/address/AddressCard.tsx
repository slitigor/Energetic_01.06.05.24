import { IAddress } from "@/data/types";
import { Card, CardHeader, CardTitle } from "../ui/card";

const AddressCard = ({ address }: { address: IAddress }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Индекс: {address.zip}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default AddressCard;
