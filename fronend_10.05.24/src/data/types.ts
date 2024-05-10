export const dbPath = "http://localhost:8080/";

export const sgTypeList: string[] = ["ОРУ", "ЗРУ", "КРУ", "КРУН", "СН", "СР"];

export const voltageList: string[] = [
  "220 кВ",
  "110 кВ",
  "35 кВ",
  "15 кВ",
  "10 кВ",
  "6 кВ",
  "0.4 кВ",
  "0.22 кВ",
];

export const eTypeList: string[] = [
  "Коммутационный аппарат",
  "Преобразователь",
  "Ограничитель перенапряжений",
  "Прочее оборудование",
];

export const eClass: string[] = [
  "Коммутационный аппарат",
  "Преобразователь",
  "Ограничитель перенапряжений",
  "Вторичное оборудование",
  "Прочее оборудование",
];

export interface IAddress {
  zip: string;
  city: string;
  street: string;
}

export interface IDistrict {
  name: string;
  dDesc?: string;
  address: IAddress;
}

export interface ISubstation {
  name: string;
  sDesc: string;
  district: IDistrict;
}

export interface ISwGear {
  sgType: string;
  voltage: string;
  sNumb: number;
  isSec: boolean;
  substation: ISubstation;
}

export interface IEquipment {
  typeName: string;
  eClass: string;
  voltage: string;
  eDesc?: string;
  fixedTs?: number;
}

export interface IConnection {
  name: string;
  dName: string;
  swGear: ISwGear;
  equipmentList?: IEquipment[];
}
