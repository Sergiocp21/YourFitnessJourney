package com.your_fitness_journey.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.util.Objects;

@Embeddable
public class UserExerciseId implements java.io.Serializable {
    private static final long serialVersionUID = 1364102810668097824L;
    @Column(name = "google_id", nullable = false, length = 50)
    private String googleId;

    @Column(name = "exercise_id", nullable = false)
    private Long exerciseId;

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public Long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserExerciseId entity = (UserExerciseId) o;
        return Objects.equals(this.googleId, entity.googleId) &&
                Objects.equals(this.exerciseId, entity.exerciseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(googleId, exerciseId);
    }

}