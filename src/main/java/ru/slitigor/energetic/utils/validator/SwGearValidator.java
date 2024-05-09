package ru.slitigor.energetic.utils.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.slitigor.energetic.model.SwGear;
import ru.slitigor.energetic.repository.SwGearRepository;

@Component
@RequiredArgsConstructor
public class SwGearValidator implements Validator {
    private final SwGearRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return SwGear.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        SwGear swGear = (SwGear) target;
        if (repository.findBySgTypeAndVoltageAndSubstation_Id(
                swGear.getSgType(),
                swGear.getVoltage(),
                swGear.getSubstation().getId()
        ).isPresent())
            errors.rejectValue("sgType", String.format(
                    "The switchgear named '%s %s' already exists in the database!",
                    swGear.getSgType(), swGear.getVoltage().getValue()));
    }
}
