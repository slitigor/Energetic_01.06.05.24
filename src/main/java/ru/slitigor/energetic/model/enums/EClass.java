package ru.slitigor.energetic.model.enums;

public enum EClass {
    SWITCHING("Коммутационный аппарат"),
    CONVERTER("Преобразователь"),
    SPARK_GAP("Ограничитель перенапряжений"),
    SECONDARY("Вторичное оборудование"),
    OTHER("Прочее оборудование");

    private String value;

    EClass(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static EClass getETypeByVal(String val) {
        for (EClass eClass: EClass.values())
            if (eClass.value.equals(val)) return eClass;
        return null;
    }
}
