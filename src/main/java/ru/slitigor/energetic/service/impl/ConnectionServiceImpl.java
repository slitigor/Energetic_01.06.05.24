package ru.slitigor.energetic.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.slitigor.energetic.model.Connection;
import ru.slitigor.energetic.model.SwGear;
import ru.slitigor.energetic.repository.ConnectionRepository;
import ru.slitigor.energetic.service.ConnectionService;
import ru.slitigor.energetic.service.EquipmentService;
import ru.slitigor.energetic.service.SwGearService;
import ru.slitigor.energetic.utils.ItemAlreadyExistsException;
import ru.slitigor.energetic.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConnectionServiceImpl implements ConnectionService {
    private final ConnectionRepository repository;
    private final SwGearService service;
//    private final EquipmentService equipmentService;

    @Override
    public Connection getByNameSwGearId(String name, Long id) {
        return repository.findByNameAndSwGear_Id(name, id).orElseThrow(() ->
                new ResourceNotFoundException("Connection", "name", name));
    }

    @Override
    public List<Connection> getAllConnection() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Connection createConnection(Connection connection) {
        Optional<Connection> isExists = repository.findByNameAndSwGear_Id(connection.getName(),
                connection.getSwGear().getId());
        if (isExists.isPresent()) throw new ItemAlreadyExistsException(String.format(
                "The connection with the name '%s' already exists!", connection.getName()
        ));
        updateLinkSwGear(connection);
        return repository.save(connection);
    }

    @Override
    @Transactional
    public Connection updateConnection(Long id, Connection connection) {
        Optional<Connection> isExists = repository.findById(id);
        if (isExists.isEmpty()) throw new ResourceNotFoundException("Connection", "id", id.toString());
        connection.setId(id);
        updateLinkSwGear(connection);
        return repository.save(connection);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteConnection(Connection connection) {
        repository.delete(getByNameSwGearId(connection.getName(), connection.getSwGear().getId()));
    }

    private void updateLinkSwGear(Connection connection) {
        SwGear swGear = service.getByTypeVoltageSubstationId(
                connection.getSwGear().getSgType(),
                connection.getSwGear().getVoltage(),
                connection.getSwGear().getSubstation().getId());
        connection.setSwGear(swGear);
        swGear.getConnectionList().add(connection);
    }
}
