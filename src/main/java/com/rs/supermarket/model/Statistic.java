package com.rs.supermarket.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Statistic extends User {
    private int totalRevenue;

    public Statistic() {
        super();
    }

    public Statistic(int customerId, int totalRevenue, int id, String name, LocalDate dob, int gender, String address, String email, String phone, String password, int role) {
        super(id, name, dob, gender, address, email, phone, password, role);
        this.totalRevenue = totalRevenue;
    }

    public int getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(int totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

}

