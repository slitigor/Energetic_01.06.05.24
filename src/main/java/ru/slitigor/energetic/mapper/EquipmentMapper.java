package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.ConnectionDto;
import ru.slitigor.energetic.dto.EquipmentDto;
import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.model.Equipment;
import ru.slitigor.energetic.model.enums.EClass;
import ru.slitigor.energetic.model.enums.Voltage;

@Component
@RequiredArgsConstructor
public class EquipmentMapper {
    private final ConnectionMapper connectionMapper;

    public Equipment convertToModel(EquipmentDto dto) {
        Equipment model = new Equipment();
        model.setTypeName(dto.getTypeName());
        model.setEClass(EClass.getETypeByVal(dto.getEClass()));
        model.setVoltage(Voltage.getNominalByVal(dto.getVoltage()));
        model.setEDesc(dto.getEDesc());
        model.setFixedTS(dto.getFixedTs());
        for (ConnectionDto cDto: dto.getConnectionList()) {
            Connection connection = connectionMapper.convertToModel(cDto);
            model.getConnectionList().add(connection);
            connection.getEquipmentList().add(model);
        }
        return model;
    }

    public EquipmentDto convertToDto(Equipment model) {
        EquipmentDto dto = new EquipmentDto();
        dto.setTypeName(model.getTypeName());
        dto.setEClass(model.getEClass().getValue());
        dto.setVoltage(model.getVoltage().getValue());
        dto.setEDesc(model.getEDesc());
        dto.setFixedTs(model.getFixedTS());
        for (Connection connection: model.getConnectionList()) {
            ConnectionDto cDto = connectionMapper.convertToDto(connection);
            dto.getConnectionList().add(cDto);
            cDto.getEquipmentList().add(dto);
        }
        return dto;
    }
}
