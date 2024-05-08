package com.rs.supermarket.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int customer_id;
    private LocalDate date;
    private int shipment;
    private int payment;
    public Order() {
    }

    public Order(int id, int customer_id, LocalDate date, int shipment, int payment) {
        this.id = id;
        this.customer_id = customer_id;
        this.date = date;
        this.shipment = shipment;
        this.payment = payment;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getShipment() {
        return shipment;
    }

    public void setShipment(int shipment) {
        this.shipment = shipment;
    }

    public int getPayment() {
        return payment;
    }

    public void setPayment(int payment) {
        this.payment = payment;
    }

}
