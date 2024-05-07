package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.slitigor.energetic.model.enums.EClass;
import ru.slitigor.energetic.model.enums.Voltage;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(40)")
    private String typeName;
    @Column(nullable = false)
    private EClass eClass;
    @Column(nullable = false)
    private Voltage voltage;
    @Column(columnDefinition = "VARCHAR(200)")
    private String eDesc;
    private int fixedTS;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "connection_equipment",
    joinColumns = @JoinColumn(name = "equipment_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "connection_id", referencedColumnName = "id"))
    private Set<Connection> connectionList = new HashSet<>();
}
