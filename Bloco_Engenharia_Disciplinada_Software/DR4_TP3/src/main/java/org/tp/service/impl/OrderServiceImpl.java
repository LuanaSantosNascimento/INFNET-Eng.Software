package org.tp.service.impl;

import org.tp.exceptions.ValidationException;
import org.tp.model.Discount;
import org.tp.model.Order;
import org.tp.service.DiscountService;
import org.tp.service.EmailService;
import org.tp.service.InvoicePrinter;
import org.tp.service.OrderService;

public class OrderServiceImpl implements OrderService {
    private final InvoicePrinter invoicePrinter;
    private final EmailService emailService;
    private final DiscountService discountService;

    public OrderServiceImpl() {
        this.invoicePrinter = new InvoicePrinterImpl();
        this.emailService = new EmailServiceImpl();
        this.discountService = new DiscountServiceImpl();
    }

    @Override
    public void processOrder(Order order) {
        validateOrder(order);

        Discount discount = discountService.calculateDiscount(order.getSubtotal());
        Order fullyProcessedOrder = order.addDiscount(discount);

        invoicePrinter.printInvoice(fullyProcessedOrder);
        sendOrderConfirmation(fullyProcessedOrder);
    }

    private void sendOrderConfirmation(Order order) {
        String subject = "Confirmação de Pedido";
        String message = buildEmailMessage(order);
        emailService.sendEmail(order.getClientEmail(), subject, message);
    }

    private String buildEmailMessage(Order order) {
        String productList = order.productsToString();
        Discount discount = order.getDiscount();

        return """
                Olá %s,
                Seu pedido foi recebido com sucesso!
                
                PRODUTOS SOLICITADOS:
                %s
                Subtotal: R$%.2f
                Desconto: R$%.2f
                Total: R$%.2f
                
                Obrigado pela sua compra!
                """.formatted(
                order.getClientName(),
                productList,
                order.getSubtotal(),
                discount.getDiscountAmount(),
                discount.getFinalAmount()
        );
    }

    private void validateOrder(Order order) {
        if (order == null) {
            throw new ValidationException("order", "Pedido não pode ser nulo");
        }
    }
}
