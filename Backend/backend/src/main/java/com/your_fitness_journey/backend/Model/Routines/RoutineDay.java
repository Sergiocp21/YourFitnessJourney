package com.your_fitness_journey.backend.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "routine_days")
public class RoutineDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "routine_id", nullable = false)
    private com.your_fitness_journey.backend.Model.Routine routine;

    @Column(name = "day_order", nullable = false)
    private Integer dayOrder;

    @Column(name = "day_name", nullable = false, length = 100)
    private String dayName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public com.your_fitness_journey.backend.Model.Routine getRoutine() {
        return routine;
    }

    public void setRoutine(com.your_fitness_journey.backend.Model.Routine routine) {
        this.routine = routine;
    }

    public Integer getDayOrder() {
        return dayOrder;
    }

    public void setDayOrder(Integer dayOrder) {
        this.dayOrder = dayOrder;
    }

    public String getDayName() {
        return dayName;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
    }

}