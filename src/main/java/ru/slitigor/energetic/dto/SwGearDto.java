package ru.slitigor.energetic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SwGearDto {
    private String sgType;
    private String voltage;
    private int sNumb;
    private boolean isSec;
    private SubstationDto substation;
}
