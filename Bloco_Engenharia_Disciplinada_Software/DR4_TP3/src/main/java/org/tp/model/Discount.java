package org.tp.model;

import org.tp.exceptions.ValidationException;

public class Discount {
    private final double rate;
    private final String description;
    private final boolean eligible;
    private final double discountAmount;
    private final double originalAmount;
    private final double finalAmount;

    public Discount(double rate, String description, boolean eligible, double discountAmount,
                    double originalAmount, double finalAmount) {

        if (originalAmount < 0) {
            throw new ValidationException("originalAmount", "Valor original não pode ser negativo");
        }
        if (discountAmount < 0) {
            throw new ValidationException("discountAmount", "Valor do desconto não pode ser negativo");
        }
        if (finalAmount < 0) {
            throw new ValidationException("finalAmount", "Valor final não pode ser negativo");
        }
        if (description == null) {
            throw new ValidationException("description", "Descrição não pode ser nula");
        }

        this.rate = rate;
        this.description = description;
        this.eligible = eligible;
        this.discountAmount = discountAmount;
        this.originalAmount = originalAmount;
        this.finalAmount = finalAmount;
    }

    // Getters
    public double getRate() {
        return rate;
    }

    public String getDescription() {
        return description;
    }

    public boolean isEligible() {
        return eligible;
    }

    public double getDiscountAmount() {
        return discountAmount;
    }

    public double getOriginalAmount() {
        return originalAmount;
    }

    public double getFinalAmount() {
        return finalAmount;
    }

    public static Discount withDiscount(double rate, String description, double originalAmount) {
        double discountAmount = originalAmount * rate;
        double finalAmount = originalAmount - discountAmount;

        return new Discount(
                rate,
                description,
                true,
                discountAmount,
                originalAmount,
                finalAmount
        );
    }

    public double getRateAsPercentage() {
        return rate * 100;
    }

    @Override
    public String toString() {
        return String.format("Discount[%s - %.1f%% - Desconto: R$%.2f - Total: R$%.2f]",
                description, getRateAsPercentage(), discountAmount, finalAmount);
    }
}
