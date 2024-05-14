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

export const addressColName = new Map([
  ["zip", "Почтовый индекс"],
  ["city", "Населённый пункт"],
  ["street", "Улица, дом"],
  ["actions", "Действия"],
]);

export interface IDistrict {
  name: string;
  ddesc?: string;
  address: IAddress;
}

export const districtColName = new Map([
  ["name", "Название"],
  ["ddesc", "Описание"],
  ["address", "Адрес"],
  ["actions", "Действия"],
]);

export interface ISubstation {
  name: string;
  sDesc?: string;
  district: IDistrict;
}

export const substationColName = new Map([
  // ["id", "ID"],
  ["name", "Называние ПС"],
  // ["psSchema", "Схема ПС"],
  ["district", "РЭС"],
  ["actions", "Действия"],
]);

export interface ISwGear {
  sgType: string;
  voltage: string;
  sNumb?: number;
  isSec?: boolean;
  substation: ISubstation;
}

export const switchgearColName = new Map([
  // ["id", "ID"],
  ["sgType", "Вид РУ"],
  ["voltage", "Напряжение"],
  ["sNumb", "Кол-во систем/секций"],
  ["isSec", "Секционированная"],
  ["substation", "Подстанция"],
  ["actions", "Действия"],
]);

export interface IEquipment {
  typeName: string;
  eClass: string;
  voltage: string;
  eDesc?: string;
  fixedTs?: number;
}

export const equipmentColName = new Map([
  ["typeName", "Тип оборудования"],
  ["eClass", "Класс оборудования"],
  ["voltage", "Напряжение"],
  ["eDesc", "Описание"],
  ["fixedTs", "Фиксация"],
  ["actions", "Действия"],
]);

export interface IConnection {
  name: string;
  dName: string;
  swGear: ISwGear;
  equipmentList?: IEquipment[];
}

export const connectionColName = new Map([
  ["name", "Наименование"],
  ["dName", "Диспетчерское наименование"],
  ["swGear", "Распредустройство"],
  ["equipmentList", "Список оборудования"],
]);
