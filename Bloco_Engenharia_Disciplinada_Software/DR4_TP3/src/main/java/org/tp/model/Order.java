package org.tp.model;

import java.util.List;
import org.tp.exceptions.ValidationException;

public class Order {
    private final Client client;
    private final List<Product> products;
    private final Discount discount;

    public Order(Client client, List<Product> products, Discount discount) {
        if (client == null) {
            throw new ValidationException("client", "Cliente não pode ser nulo");
        }
        if (products == null) {
            throw new ValidationException("products", "Lista de produtos não pode ser nula");
        }

        this.client = client;
        this.products = List.copyOf(products);
        this.discount = discount;
    }

    public Order(Client client, List<Product> products) {
        this(client, products, null);
    }


    public Order addDiscount(Discount discount) {
        return new Order(this.client, this.products, discount);
    }

    public String getClientName() {
        return client.name();
    }

    public String getClientEmail() {
        return client.email();
    }

    public List<Product> getProducts() {
        return products;
    }

    public Discount getDiscount() {
        return discount;
    }

    public double getSubtotal() {
        return products.stream()
                .mapToDouble(Product::getTotalPrice)
                .sum();
    }

    @Override
    public String toString() {
        return String.format("Order[Cliente=%s, Email=%s, Produtos=%d, Subtotal=R$%.2f]",
                client.name(), client.email(), products.size(), getSubtotal());
    }

    public String productsToString() {
        StringBuilder productList = new StringBuilder();
        for (Product product : products) {
            productList.append(String.format("- %dx %s - R$%.2f (unit.) = R$%.2f%n",
                    product.quantity(),
                    product.name(),
                    product.price(),
                    product.getTotalPrice()));
        }

        return productList.toString();

    }
}
