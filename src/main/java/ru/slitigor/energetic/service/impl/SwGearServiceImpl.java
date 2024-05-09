package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.model.SwGear;
import ru.slitigor.energetic.model.enums.SGType;
import ru.slitigor.energetic.model.enums.Voltage;
import ru.slitigor.energetic.repository.SwGearRepository;
import ru.slitigor.energetic.service.SubstationService;
import ru.slitigor.energetic.service.SwGearService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SwGearServiceImpl implements SwGearService {
    private final SwGearRepository repository;
    private final SubstationService service;

    @Override
    public SwGear getByTypeVoltageSubstationId(SGType sgType, Voltage voltage, Integer id) {
        return repository.findBySgTypeAndVoltageAndSubstation_Id(sgType, voltage, id).orElseThrow(() ->
                new ResourceNotFoundException("SwGear", "sgType", sgType.getValue()));
    }

    @Override
    public List<SwGear> getAllSwGear() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public SwGear createSwGear(SwGear swGear) {
        Optional<SwGear> isExists = repository.findBySgTypeAndVoltageAndSubstation_Id(
                swGear.getSgType(), swGear.getVoltage(), swGear.getSubstation().getId()
        );
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The switchgear with the type '%s' already exists!", swGear.getSgType().getValue()
        ));
        updateLinkSubstation(swGear);
        return repository.save(swGear);
    }

    @Override
    @Transactional
    public SwGear updateSwGear(Long id, SwGear swGear) {
        Optional<SwGear> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("SwGear", "id", id.toString());
        swGear.setId(id);
        updateLinkSubstation(swGear);
        return repository.save(swGear);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteSwGear(SwGear swGear) {
        repository.delete(getByTypeVoltageSubstationId(
                swGear.getSgType(), swGear.getVoltage(), swGear.getSubstation().getId()
        ));
    }

    private void updateLinkSubstation(SwGear swGear) {
        Substation substation = service.getByNameAndDistrictId(swGear.getSubstation().getName(),
                swGear.getSubstation().getDistrict().getId());
        swGear.setSubstation(substation);
        substation.getSwitchgearList().add(swGear);
    }
}
