package org.tp.service;

import org.tp.model.Discount;

public interface DiscountService {
    Discount calculateDiscount(double subtotal);
}
