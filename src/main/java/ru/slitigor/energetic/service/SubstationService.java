package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Substation;

import java.util.List;
import java.util.Optional;

public interface SubstationService {
    Substation getByNameAndDistrictId(String name, Integer id);
    List<Substation> getAllSubstation();
    Substation createSubstation(Substation substation);
    Substation updateSubstation(Integer id, Substation substation);
    void deleteById(Integer id);
    void deleteSubstation(Substation substation);
}
