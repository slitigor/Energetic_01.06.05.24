package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.ConnectionDto;
import ru.slitigor.energetic.dto.EquipmentDto;
import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.model.Equipment;

@Component
@RequiredArgsConstructor
public class ConnectionMapper {
    private final SwGearMapper swGearMapper;
    private final EquipmentMapper equipmentMapper;

    public Connection convertToModel(ConnectionDto dto) {
        Connection model = new Connection();
        model.setName(dto.getName());
        model.setDName(dto.getDName());
        model.setSwGear(swGearMapper.convertToModel(dto.getSwGear()));
        for (EquipmentDto eDto: dto.getEquipmentList()) {
            Equipment equipment = equipmentMapper.convertToModel(eDto);
            model.getEquipmentList().add(equipment);
            equipment.getConnectionList().add(model);
        }
        return model;
    }

    public ConnectionDto convertToDto(Connection model) {
        ConnectionDto dto = new ConnectionDto();
        dto.setName(model.getName());
        dto.setDName(model.getDName());
        dto.setSwGear(swGearMapper.convertToDto(model.getSwGear()));
        for (Equipment eModel: model.getEquipmentList()) {
            EquipmentDto equipmentDto = equipmentMapper.convertToDto(eModel);
            dto.getEquipmentList().add(equipmentDto);
        }
        return dto;
    }
}
