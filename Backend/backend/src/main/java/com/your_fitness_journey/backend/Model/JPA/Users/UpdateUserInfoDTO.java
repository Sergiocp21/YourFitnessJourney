package com.your_fitness_journey.backend.Model.JPA.Users;

public class UpdateUserInfoDTO {
    private String name;
    private String email;
    private String pictureUrl;
    private int weight;
    private int height;



    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public int getWeight() {
        return weight;
    }

    public int getHeight() {
        return height;
    }
}
