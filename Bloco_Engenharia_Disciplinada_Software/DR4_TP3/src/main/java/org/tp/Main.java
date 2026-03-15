package org.tp;

import java.util.List;
import org.tp.exceptions.ValidationException;
import org.tp.model.Client;
import org.tp.model.Order;
import org.tp.model.Product;
import org.tp.service.OrderService;
import org.tp.service.impl.OrderServiceImpl;

public class Main {

    public static void main(String[] args) {
        try {
            OrderService orderService = new OrderServiceImpl();

            System.out.println("=== DESCONTO FIXO 10% ===\n");

            System.out.println("=== Pedido De Menor Valor (R$ 50) ===");
            Order smallOrder = createSmallOrder();
            orderService.processOrder(smallOrder);

            System.out.println("\n=== Pedido Com Valor Médio (R$ 500) ===");
            Order mediumOrder = createMediumOrder();
            orderService.processOrder(mediumOrder);

            System.out.println("\n=== Pedido De Maior Valor (R$ 6000) ===");
            Order largeOrder = createExpensiveOrder();
            orderService.processOrder(largeOrder);

            System.out.println("\n=== ValidationException ===");
            Order invalidOrder = createInvalidOrder();
            orderService.processOrder(invalidOrder);

        } catch (ValidationException e) {
            System.err.printf("Erro de validação no campo '%s': %s%n", e.getField(), e.getMessage());
        }
    }

    private static Order createSmallOrder() {
        Client client = new Client("Maria Elias", "maria@email.com");
        List<Product> products = List.of(
                new Product("Pulseira", 1, 50.0)
        );
        return new Order(client, products);
    }

    private static Order createMediumOrder() {
        Client client = new Client("João Almeida", "joao@email.com");
        List<Product> products = List.of(
                new Product("Par de brincos Estela", 1, 80.0),
                new Product("Camiseta rosa floral", 1, 120.0),
                new Product("Bolsa Amanda", 1, 300.0)
        );
        return new Order(client, products);
    }

    private static Order createExpensiveOrder() {
        Client client = new Client("Ana", "ana@email.com");
        List<Product> products = List.of(
                new Product("MacBook Pro", 1, 6000.0)
        );
        return new Order(client, products);
    }

    private static Order createInvalidOrder() {
        Client client = new Client("Carlos", "carlos@email.com");
        List<Product> products = List.of(
                new Product("Produto Inválido", -1, 100.0));
        return new Order(client, products);
    }
}
