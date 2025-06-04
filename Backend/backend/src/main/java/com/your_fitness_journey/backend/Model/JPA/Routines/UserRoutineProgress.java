package com.your_fitness_journey.backend.Model.JPA.Routines;

import com.your_fitness_journey.backend.Model.JPA.Users.User;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Table(name = "user_routine_progress")
public class UserRoutineProgress {
    @Id
    @Column(name = "google_id", nullable = false, length = 50)
    private String googleId;

    @Version
    private Long version;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "google_id", nullable = false)
    private User users;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "routine_id", nullable = false)
    private Routine routine;

    @ColumnDefault("1")
    @Column(name = "current_day_order", nullable = false)
    private Integer currentDayOrder;

    @Column(name = "last_completed")
    private LocalDate lastCompleted;

    public UserRoutineProgress() {}

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }

    public Routine getRoutine() {
        return routine;
    }

    public void setRoutine(Routine routine) {
        this.routine = routine;
    }

    public Integer getCurrentDayOrder() {
        return currentDayOrder;
    }

    public void setCurrentDayOrder(Integer currentDayOrder) {
        this.currentDayOrder = currentDayOrder;
    }

    public LocalDate getLastCompleted() {
        return lastCompleted;
    }

    public void setLastCompleted(LocalDate lastCompleted) {
        this.lastCompleted = lastCompleted;
    }

}