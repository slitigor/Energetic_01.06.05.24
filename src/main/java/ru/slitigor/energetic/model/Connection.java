package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "e_connection", uniqueConstraints = {@UniqueConstraint(name = "unique_name_sw_gear_id",
columnNames = {"name", "sw_gear_id"})})
public class Connection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private String name;
    @Column(nullable = false, columnDefinition = "VARCHAR(150)")
    private String dName;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sw_gear_id", nullable = false, referencedColumnName = "id")
    private SwGear swGear;
    @ManyToMany(mappedBy = "connectionList", fetch = FetchType.EAGER)
    private Set<Equipment> equipmentList = new HashSet<>();

    public void addEquipment(Equipment equipment) {
        if (this.equipmentList.contains(equipment)) return;
        this.equipmentList.add(equipment);
        equipment.getConnectionList().add(this);
    }

    public void removeEquipment(Equipment equipment) {
        if (this.equipmentList.contains(equipment)) {
            this.equipmentList.remove(equipment);
            equipment.getConnectionList().remove(this);
        }
    }
}
