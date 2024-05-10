package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.model.Equipment;
import ru.slitigor.energetic.repository.EquipmentRepository;
import ru.slitigor.energetic.service.ConnectionService;
import ru.slitigor.energetic.service.EquipmentService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EquipmentServiceImpl implements EquipmentService {
    private final EquipmentRepository repository;
//    private final ConnectionService service;

    @Override
    public Equipment getByTypeName(String typeName) {
        return repository.findByTypeName(typeName).orElseThrow(() ->
                new ResourceNotFoundException("Equipment", "typeName", typeName));
    }

    @Override
    public List<Equipment> getAllEquipment() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Equipment createEquipment(Equipment equipment) {
        Optional<Equipment> isExists = repository.findByTypeName(equipment.getTypeName());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The equipment with the type name '%s' already exists!", equipment.getTypeName()
        ));
        return repository.save(equipment);
    }

    @Override
    @Transactional
    public Equipment updateEquipment(Long id, Equipment equipment) {
        Optional<Equipment> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("Equipment", "id", id.toString());
        equipment.setId(id);
        return repository.save(equipment);
    }

    @Override
    @Transactional
    public void deleteByName(String typeName) {
        repository.delete(getByTypeName(typeName));
    }

    @Override
    @Transactional
    public void deleteEquipment(Equipment equipment) {
        repository.delete(equipment);
    }

}
