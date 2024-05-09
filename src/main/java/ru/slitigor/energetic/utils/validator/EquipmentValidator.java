package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.Equipment;
import ru.slitigor.energetic.repository.EquipmentRepository;

@Component
@RequiredArgsConstructor
public class EquipmentValidator implements Validator {
    private final EquipmentRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return Equipment.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Equipment equipment = (Equipment) target;
        if (repository.findByTypeName(equipment.getTypeName()).isPresent())
            errors.rejectValue("typeName", String.format(
                    "The equipment with the type name '%s' is already present in the database!",
                    equipment.getTypeName()));
    }
}
