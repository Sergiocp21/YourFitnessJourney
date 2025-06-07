package com.your_fitness_journey.backend.Model.JPA.Users;

public class UpdateUserInfoDTO {
    private String name;
    private String email;
    private String pictureUrl;
    private double weight;
    private double height;



    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public double getWeight() {
        return weight;
    }

    public double getHeight() {
        return height;
    }
}
