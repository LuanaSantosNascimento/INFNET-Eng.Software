package org.tp.model;

import org.tp.exceptions.ValidationException;

public class Product {
    private final String name;
    private final int quantity;
    private final double price;

    public Product(String name, int quantity, double price) {
        if (name == null || name.trim().isEmpty()) {
            throw new ValidationException("name", "Nome do produto não pode ser nulo ou vazio.");
        }
        if (quantity <= 0) {
            throw new ValidationException("quantity", "Quantidade deve ser maior que zero.");
        }
        if (price < 0) {
            throw new ValidationException("price", "Preço não pode ser negativo.");
        }

        this.name = name.trim();
        this.quantity = quantity;
        this.price = price;
    }

    public String name() {
        return name;
    }

    public int quantity() {
        return quantity;
    }

    public double price() {
        return price;
    }

    public double getTotalPrice() {
        return price * quantity;
    }

    @Override
    public String toString() {
        return String.format("%dx %s - R$%.2f", quantity, name, price);
    }
}
