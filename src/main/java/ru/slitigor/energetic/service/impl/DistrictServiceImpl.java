package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Address;
import ru.slitigor.energetic.model.District;
import ru.slitigor.energetic.repository.DistrictRepository;
import ru.slitigor.energetic.service.AddressService;
import ru.slitigor.energetic.service.DistrictService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DistrictServiceImpl implements DistrictService {
    private final DistrictRepository repository;
    private final AddressService addressService;

    @Override
    public District getDistrictByName(String name) {
        return repository.findByName(name).orElseThrow(() ->
                new ResourceNotFoundException("District", "name", name));
    }

    @Override
    public List<District> getAllDistrict() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public District createDistrict(District district) {
        Optional<District> isExists = repository.findByName(district.getName());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The district with the name '%s' already exists!", district.getName()
        ));
        updateLinkSubstation(district);
        return repository.save(district);
    }

    @Override
    @Transactional
    public District updateDistrict(String name, District district) {
        Optional<District> isExists = repository.findByName(name);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("District", "name", name);
        district.setName(name);
        district.setId(isExists.get().getId());
        return repository.save(district);
    }

    @Override
    @Transactional
    public void deleteDistrict(String name) {
        repository.delete(getDistrictByName(name));
    }

    private void updateLinkSubstation(District district) {
        Address address = addressService.getAddressByZip(district.getAddress().getZip());
        if (address.getDistrict() == null) {
            district.setAddress(address);
            address.setDistrict(district);
        } else if (address.getDistrict() != district)
            throw new ItemAlreadyExistsException(String.format(
                    "The address with the zip code '%s' is already linked to another district: '%s'",
                    address.getZip(), address.getDistrict().getName()
            ));
    }
}
