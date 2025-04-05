package com.your_fitness_journey.backend.Model;

public class UserNameAndImageDTO {
    public String username;
    public String imgUrl;

    public UserNameAndImageDTO(User user) {
        this.username = user.getName();
        this.imgUrl = user.getPictureUrl();
    }
}
