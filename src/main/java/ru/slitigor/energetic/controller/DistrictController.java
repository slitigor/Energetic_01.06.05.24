package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.DistrictDto;
import ru.slitigor.energetic.mapper.DistrictMapper;
import ru.slitigor.energetic.model.District;
import ru.slitigor.energetic.service.DistrictService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.DistrictValidator;

import java.util.List;

@RestController
@RequestMapping("/district")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class DistrictController {
    private final DistrictService districtService;
    private final DistrictMapper mapper;
    private final DistrictValidator validator;

    @GetMapping
    public ResponseEntity<List<DistrictDto>> getAllDistricts() {
        List<DistrictDto> district = districtService.getAllDistrict().stream()
                .map(mapper::convertToDistrictDto).toList();
        return new ResponseEntity<>(district, HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<DistrictDto> getDistrictByName(@PathVariable("name") String name) {
        return new ResponseEntity<>(mapper.convertToDistrictDto(districtService.getDistrictByName(name)),
                HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DistrictDto> createDistrict(@RequestBody @Valid DistrictDto districtDto,
                                                      BindingResult bindingResult) {
        District districtToCreated = mapper.convertToDistrict(districtDto);
        validator.validate(districtToCreated, bindingResult);
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        districtService.createDistrict(districtToCreated);

        return  new ResponseEntity<>(mapper.convertToDistrictDto(districtToCreated), HttpStatus.CREATED);
    }

    @PutMapping("/{name}")
    public ResponseEntity<DistrictDto> updateDistrict(@PathVariable("name") String name,
                                                      @RequestBody @Valid DistrictDto districtDto,
                                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        districtService.updateDistrict(name, mapper.convertToDistrict(districtDto));

        return new ResponseEntity<>(districtDto, HttpStatus.OK);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteDistrict(@PathVariable("name") String name) {
        districtService.deleteDistrict(name);
        return new ResponseEntity<>(String.format(
                "The district with the name '%s' has been deleted from the database.", name), HttpStatus.OK);
    }
}
