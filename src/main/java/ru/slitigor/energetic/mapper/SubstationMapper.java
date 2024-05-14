package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.SubstationDto;
import ru.slitigor.energetic.model.District;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.service.DistrictService;

@Component
@RequiredArgsConstructor
public class SubstationMapper {
    private final DistrictService districtService;
    private final DistrictMapper mapper;

    public Substation convertToSubstation(SubstationDto substationDto) {
        Substation substation = new Substation();
        substation.setId(substationDto.getId());
        substation.setName(substationDto.getName());
        substation.setSDesc(substationDto.getSDesc());
//        substation.setPsSchema(PSSchema.getSchemaByVal(substationDto.getPsSchema()));
        District district = districtService.getDistrictByName(substationDto.getDistrict().getName());
        substation.setDistrict(district);

        return substation;
    }

    public SubstationDto convertToSubstationDto(Substation substation) {
        SubstationDto substationDto = new SubstationDto();
        substationDto.setId(substation.getId());
        substationDto.setName(substation.getName());
        substationDto.setSDesc(substation.getSDesc());
//        substationDto.setPsSchema(substation.getPsSchema().getValue());
        substationDto.setDistrict(mapper.convertToDistrictDto(substation.getDistrict()));

        return substationDto;
    }
}
