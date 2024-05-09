package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.District;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.repository.SubstationRepository;
import ru.slitigor.energetic.service.DistrictService;
import ru.slitigor.energetic.service.SubstationService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubstationServiceImpl implements SubstationService {
    private final SubstationRepository repository;
    private final DistrictService districtService;

    @Override
    public Substation getByNameAndDistrictId(String name, Integer id) {
        return repository.findByNameAndDistrict_Id(name, id).orElseThrow(() ->
                new ResourceNotFoundException("Substation", "name", name));
    }

    @Override
    public List<Substation> getAllSubstation() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Substation createSubstation(Substation substation) {
        Optional<Substation> isExists = repository.findByNameAndDistrict_Id(
                substation.getName(), substation.getDistrict().getId()
        );
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The substation with the name '%s' already exists!", substation.getName()
        ));
        updateDistrictLink(substation);
        return repository.save(substation);
    }

    @Override
    @Transactional
    public Substation updateSubstation(Integer id, Substation substation) {
        Optional<Substation> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("Substation", "id", id.toString());
        substation.setId(id);
        updateDistrictLink(substation);
        return repository.save(substation);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public void deleteSubstation(Substation substation) {
        repository.delete(getByNameAndDistrictId(substation.getName(), substation.getDistrict().getId()));
    }

    private void updateDistrictLink(Substation substation) {
        District district = districtService.getDistrictByName(substation.getDistrict().getName());
        substation.setDistrict(district);
        district.getSubstations().add(substation);
    }
}
