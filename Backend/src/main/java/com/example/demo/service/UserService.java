package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    public UserService(UserRepository userRepository, AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }

    public User createUser(User user, String actorName, String actorRole) {
        // Generate badge initials from name
        String[] parts = user.getName().split(" ");
        StringBuilder initials = new StringBuilder();
        for (String p : parts) {
            if (!p.isEmpty()) initials.append(p.charAt(0));
        }
        user.setBadgeInitials(initials.toString().toUpperCase().substring(0, Math.min(2, initials.length())));
        user.setStatus("Active");

        User saved = userRepository.save(user);
        auditLogService.log(actorName, actorRole, "User Created", saved.getId() + " (" + saved.getName() + ")");
        return saved;
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User setUserStatus(String userId, String status, String actorName, String actorRole) {
        return userRepository.findById(userId).map(u -> {
            u.setStatus(status);
            User saved = userRepository.save(u);
            String action = "Active".equals(status) ? "User Activated" : "User Deactivated";
            auditLogService.log(actorName, actorRole, action, userId + " (" + u.getName() + ")");
            return saved;
        }).orElseThrow(() -> new RuntimeException("User not found: " + userId));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
