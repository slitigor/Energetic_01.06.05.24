package ru.slitigor.energetic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "substation", uniqueConstraints = {@UniqueConstraint(name = "unique_name_district_id_key",
columnNames = {"name", "district_id"})})
public class Substation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, columnDefinition = "VARCHAR(40)")
    private String name;
//    @Column(nullable = false)
//    private PSSchema psSchema;
    @ManyToOne()
    @JoinColumn(name = "district_id", columnDefinition = "id", nullable = false)
    private District district;
    @Column(columnDefinition = "VARCHAR(255)")
    private String sDesc;
    @OneToMany(mappedBy = "substation")
    private Set<SwGear> switchgearList = new HashSet<>();

}
