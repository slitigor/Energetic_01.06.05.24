package ru.slitigor.energetic.service;

import ru.slitigor.energetic.model.Connection;

import java.util.List;

public interface ConnectionService {
    Connection getByNameSwGearId(String name, Long id);
    List<Connection> getAllConnection();
    Connection createConnection(Connection connection);
    Connection updateConnection(Long id, Connection connection);
    void deleteById(Long id);
    void deleteConnection(Connection connection);
}
