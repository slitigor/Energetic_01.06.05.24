package ru.slitigor.energetic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.slitigor.energetic.model.Substation;

import java.util.Optional;

public interface SubstationRepository extends JpaRepository<Substation, Integer> {
    Optional<Substation> findByNameAndDistrict_Id(String name, Integer id);
}
