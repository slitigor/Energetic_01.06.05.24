package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.SwGearDto;
import ru.slitigor.energetic.model.SwGear;
import ru.slitigor.energetic.model.enums.SGType;
import ru.slitigor.energetic.model.enums.Voltage;

@Component
@RequiredArgsConstructor
public class SwGearMapper {
    private final SubstationMapper mapper;

    public SwGear convertToModel(SwGearDto dto) {
        SwGear model = new SwGear();
        model.setSgType(SGType.getTypeByVal(dto.getSgType()));
        model.setVoltage(Voltage.getNominalByVal(dto.getVoltage()));
        model.setSNumb(dto.getSNumb());
        model.setSec(dto.isSec());
        model.setSubstation(mapper.convertToSubstation(dto.getSubstation()));

        return model;
    }

    public SwGearDto convertToDto(SwGear model) {
        SwGearDto dto = new SwGearDto();
        dto.setSgType(model.getSgType().getValue());
        dto.setVoltage(model.getVoltage().getValue());
        dto.setSNumb(model.getSNumb());
        dto.setSec(model.isSec());
        dto.setSubstation(mapper.convertToSubstationDto(model.getSubstation()));

        return dto;
    }
}
