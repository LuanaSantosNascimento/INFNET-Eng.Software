package org.tp.service.impl;

import org.tp.model.Discount;
import org.tp.model.Order;
import org.tp.model.Product;
import org.tp.service.InvoicePrinter;

public class InvoicePrinterImpl implements InvoicePrinter {
    private static final String CURRENCY_SYMBOL = "R$";
    private static final String CLIENT_LABEL = "Cliente: ";
    private static final String SUBTOTAL_LABEL = "Subtotal: ";
    private static final String DISCOUNT_LABEL = "Desconto: ";
    private static final String TOTAL_LABEL = "Valor final: ";

    public InvoicePrinterImpl() {
    }

    @Override
    public void printInvoice(Order order) {

        Discount discount = order.getDiscount();

        System.out.println(CLIENT_LABEL + order.getClientName());
        System.out.println("==================================================");

        for (Product product : order.getProducts()) {
            System.out.printf("%s - %s%.2f%n",
                    product.toString(),
                    CURRENCY_SYMBOL,
                    product.getTotalPrice());
        }

        System.out.println("--------------------------------------------------");
        System.out.printf("%s%s%.2f%n", SUBTOTAL_LABEL, CURRENCY_SYMBOL, discount.getOriginalAmount());
        System.out.printf("%s%s%.2f (%.1f%%)%n", DISCOUNT_LABEL, CURRENCY_SYMBOL,
                discount.getDiscountAmount(), discount.getRateAsPercentage());
        System.out.println("==================================================");
        System.out.printf("%s%s%.2f%n", TOTAL_LABEL, CURRENCY_SYMBOL, discount.getFinalAmount());
    }
}
