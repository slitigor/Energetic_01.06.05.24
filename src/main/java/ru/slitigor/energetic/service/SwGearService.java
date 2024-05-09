package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.SwGear;
import ru.slitigor.energetic.model.enums.SGType;
import ru.slitigor.energetic.model.enums.Voltage;

import java.util.List;

public interface SwGearService {
    SwGear getByTypeVoltageSubstationId(SGType sgType, Voltage voltage, Integer id);
    List<SwGear> getAllSwGear();
    SwGear createSwGear(SwGear swGear);
    SwGear updateSwGear(Long id, SwGear swGear);
    void deleteById(Long id);
    void deleteSwGear(SwGear swGear);
}
