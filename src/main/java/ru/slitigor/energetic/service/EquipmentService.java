package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Equipment;

import java.util.List;

public interface EquipmentService {
    Equipment getByTypeName(String typeName);
    List<Equipment> getAllEquipment();
    Equipment createEquipment(Equipment equipment);
    Equipment updateEquipment(Long id, Equipment equipment);
    void deleteByName(String typeName);
    void deleteEquipment(Equipment equipment);
}
