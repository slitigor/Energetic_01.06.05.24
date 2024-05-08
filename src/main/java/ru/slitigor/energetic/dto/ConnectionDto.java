package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class ConnectionDto {
    private String name;
    private String dName;
    private SwGearDto swGear;
    private Set<EquipmentDto> equipmentList = new HashSet<>();
}
