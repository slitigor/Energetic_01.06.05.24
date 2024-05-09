package ru.slitigor.energetic.mapper;

import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.AddressDto;
import ru.slitigor.energetic.model.Address;

@Component
public class AddressMapper {
    public Address convertToAddress(AddressDto addressDto) {
        Address address = new Address();
        address.setZip(addressDto.getZip());
        address.setCity(addressDto.getCity());
        address.setStreet(addressDto.getStreet());

        return address;
    }

    public AddressDto convertToAddressDto(Address address) {
        AddressDto addressDto = new AddressDto();
        addressDto.setZip(address.getZip());
        addressDto.setCity(address.getCity());
        addressDto.setStreet(address.getStreet());

        return addressDto;
    }
}
