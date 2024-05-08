package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.SwGear;
import ru.slitigor.energetic.model.enums.SGType;
import ru.slitigor.energetic.model.enums.Voltage;

import java.util.Optional;

public interface SwGearRepository extends JpaRepository<SwGear, Long> {
    Optional<SwGear> findBySgTypeAndVoltageAndSubstation_Id(SGType sgType, Voltage voltage, Integer id);
}
