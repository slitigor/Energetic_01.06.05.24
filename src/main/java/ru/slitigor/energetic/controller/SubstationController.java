package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.SubstationDto;
import ru.slitigor.energetic.mapper.SubstationMapper;
import ru.slitigor.energetic.model.Substation;
import ru.slitigor.energetic.service.SubstationService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.SubstationValidator;

import java.util.List;

@RestController
@RequestMapping("/district")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class SubstationController {
    private final SubstationService service;
    private final SubstationValidator validator;
    private final SubstationMapper mapper;

    @GetMapping
    public ResponseEntity<List<SubstationDto>> getAllSubstation() {
        List<SubstationDto> substationList = service.getAllSubstation().stream().map(
                mapper::convertToSubstationDto).toList();
        return new ResponseEntity<>(substationList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SubstationDto> createSubstation(@RequestBody @Valid SubstationDto substationDto,
                                                          BindingResult bindingResult) {
        Substation createdSubstation = mapper.convertToSubstation(substationDto);
        validator.validate(createdSubstation, bindingResult);
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.createSubstation(createdSubstation);

        return new ResponseEntity<>(substationDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubstationDto> updateSubstation(@PathVariable Integer id,
                                                          @RequestBody @Valid SubstationDto dto,
                                                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.updateSubstation(id, mapper.convertToSubstation(dto));

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSubstation(@PathVariable Integer id) {
        service.deleteById(id);
        return new ResponseEntity<>(String.format(
                "The substation with the id '%s' has been deleted from the database.", id), HttpStatus.OK);
    }
}
