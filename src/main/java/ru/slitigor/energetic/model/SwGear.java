package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.slitigor.energetic.model.enums.SGType;
import ru.slitigor.energetic.model.enums.Voltage;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "swgear", uniqueConstraints = {@UniqueConstraint(name = "unique_type_voltage_substation_id",
columnNames = {"sg_type", "voltage", "substation_id"})})
public class SwGear {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private SGType sgType;
    @Column(nullable = false)
    private Voltage voltage;
    private int sNumb = 1;
    private boolean isSec = false;
    @ManyToOne()
    @JoinColumn(name = "substation_id", referencedColumnName = "id", nullable = false)
    private Substation substation;
    @OneToMany(mappedBy = "swGear")
    private List<Connection> connectionList = new ArrayList<>();
}
