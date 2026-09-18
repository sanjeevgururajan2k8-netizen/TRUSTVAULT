package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String id;
    private String employeeId;
    private String name;
    private String email;
    private String role;
    private String department;
    private String status;
    private LocalDateTime lastLogin;
    private String badgeInitials;

    public User() {
    }

    public User(String id, String employeeId, String name, String email, String role, String department, String status, LocalDateTime lastLogin, String badgeInitials) {
        this.id = id;
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.department = department;
        this.status = status;
        this.lastLogin = lastLogin;
        this.badgeInitials = badgeInitials;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public String getBadgeInitials() {
        return badgeInitials;
    }

    public void setBadgeInitials(String badgeInitials) {
        this.badgeInitials = badgeInitials;
    }
}
