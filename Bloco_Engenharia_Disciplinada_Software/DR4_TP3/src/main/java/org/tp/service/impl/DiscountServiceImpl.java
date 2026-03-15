package org.tp.service.impl;

import org.tp.model.Discount;
import org.tp.service.DiscountService;

public class DiscountServiceImpl implements DiscountService {

    private static final double DISCOUNT_RATE = 0.1;
    private static final String DESCRIPTION = "Desconto padrão (10%)";

    @Override
    public Discount calculateDiscount(double subtotal) {

        return Discount.withDiscount(
                DISCOUNT_RATE,
                DESCRIPTION,
                subtotal
        );
    }
}
