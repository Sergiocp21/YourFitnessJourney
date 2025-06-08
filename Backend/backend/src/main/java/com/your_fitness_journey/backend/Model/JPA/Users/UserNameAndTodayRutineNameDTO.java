package com.your_fitness_journey.backend.Model.JPA.Users;

public class UserNameAndTodayRutineNameDTO {
    private String userName;
    private String todayRoutineName;

    public UserNameAndTodayRutineNameDTO(String userName, String todayRutineName) {
        this.userName = userName;
        this.todayRoutineName = todayRutineName;
    }

    public UserNameAndTodayRutineNameDTO() {

    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTodayRoutineName() {
        return todayRoutineName;
    }

    public void setTodayRoutineName(String todayRutineName) {
        this.todayRoutineName = todayRutineName;
    }
}
