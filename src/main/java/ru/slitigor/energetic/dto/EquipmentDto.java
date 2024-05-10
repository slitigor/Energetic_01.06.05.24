package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class EquipmentDto {
    private String typeName;
    private String eClass;
    private String voltage;
    private String eDesc;
    private int fixedTs;
//    private Set<ConnectionDto> connectionList = new HashSet<>();
}
