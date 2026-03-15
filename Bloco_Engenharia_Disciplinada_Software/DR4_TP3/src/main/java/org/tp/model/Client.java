package org.tp.model;

import org.tp.exceptions.ValidationException;

public class Client {
    private final String name;
    private final String email;

    public Client(String name, String email) {
        if (name == null || name.trim().isEmpty()) {
            throw new ValidationException("name", "Nome do cliente não pode ser nulo ou vazio.");
        }
        if (email == null || email.trim().isEmpty()) {
            throw new ValidationException("email", "Email do cliente não pode ser nulo ou vazio.");
        }
        if (!isValidEmail(email)) {
            throw new ValidationException("email", "Email do cliente não possui formato válido.");
        }

        this.name = name.trim();
        this.email = email.trim().toLowerCase();
    }

    public String name() {
        return name;
    }

    public String email() {
        return email;
    }

    private static boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }

    @Override
    public String toString() {
        return String.format("Cliente[Nome=%s, Email=%s]", name, email);
    }
}
