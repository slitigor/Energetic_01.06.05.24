package ru.slitigor.energetic.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.slitigor.energetic.dto.AddressDto;
import ru.slitigor.energetic.mapper.AddressMapper;
import ru.slitigor.energetic.model.Address;
import ru.slitigor.energetic.service.AddressService;
import ru.slitigor.energetic.utils.ErrorMessageBuilder;
import ru.slitigor.energetic.utils.ValidationException;
import ru.slitigor.energetic.utils.validator.AddressValidator;

import java.util.List;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class AddressController {
    private final AddressService service;
    private final AddressMapper mapper;
    private final AddressValidator validator;

    @GetMapping("/{zip}")
    public ResponseEntity<AddressDto> getAddressByPostalCode(@PathVariable("zip") String zip) {
        return new ResponseEntity<>(mapper.convertToAddressDto(
                service.getAddressByZip(zip)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<AddressDto>> getAllAddress() {
        List<AddressDto> addresses = service.getAllAddress().stream().map(mapper::convertToAddressDto).toList();
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AddressDto> createAddress(@RequestBody @Valid AddressDto addressDto,
                                                    BindingResult bindingResult) {
        Address addressToCreated = mapper.convertToAddress(addressDto);
        validator.validate(addressToCreated, bindingResult);
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.createAddress(addressToCreated);

        return new ResponseEntity<>(mapper.convertToAddressDto(addressToCreated), HttpStatus.CREATED);
    }

    @PutMapping("/{zip}")
    public ResponseEntity<AddressDto> updateAddress(@PathVariable("zip") String postalCode,
                                                    @RequestBody @Valid AddressDto addressDto,
                                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new ValidationException(ErrorMessageBuilder
                .getErrorMessageToClient(bindingResult));
        service.updateAddress(postalCode, mapper.convertToAddress(addressDto));

        return new ResponseEntity<>(addressDto, HttpStatus.OK);
    }

    @DeleteMapping("/{zip}")
    public ResponseEntity<String> deleteAddress(@PathVariable("zip") String postalCode) {
        service.deleteAddress(postalCode);
        return new ResponseEntity<>(String.format(
                "The address with the zip code '%s' has been deleted from the database.", postalCode),
                HttpStatus.OK);
    }
}
