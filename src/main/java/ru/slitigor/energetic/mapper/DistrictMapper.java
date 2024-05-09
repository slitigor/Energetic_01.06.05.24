package ru.slitigor.energetic.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.slitigor.energetic.dto.DistrictDto;
import ru.slitigor.energetic.model.Address;
import ru.slitigor.energetic.model.District;
import ru.slitigor.energetic.service.AddressService;

@Component
@RequiredArgsConstructor
public class DistrictMapper {
    private final AddressService addressService;
    private final AddressMapper mapper;

    public District convertToDistrict(DistrictDto districtDto) {
        District district = new District();
        district.setName(districtDto.getName());
        district.setDDesc(districtDto.getDDesc());
        Address address = addressService.getAddressByZip(districtDto.getAddress().getZip());
        district.setAddress(address);

        return district;
    }

    public DistrictDto convertToDistrictDto(District district) {
        DistrictDto districtDto = new DistrictDto();
        districtDto.setName(district.getName());
        districtDto.setDDesc(district.getDDesc());
        districtDto.setAddress(mapper.convertToAddressDto(district.getAddress()));

        return districtDto;
    }
}
