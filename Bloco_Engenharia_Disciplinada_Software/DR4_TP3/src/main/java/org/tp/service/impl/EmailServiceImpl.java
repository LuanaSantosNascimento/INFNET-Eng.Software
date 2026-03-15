package org.tp.service.impl;

import org.tp.exceptions.ValidationException;
import org.tp.service.EmailService;

public class EmailServiceImpl implements EmailService {

    @Override
    public void sendEmail(String to, String subject, String message) {
        if (to == null || to.trim().isEmpty()) {
            throw new ValidationException("to", "Email do(a) destinatário(a) não pode ser nulo ou vazio");
        }

        System.out.printf("\nEnviando e-mail para %s%n", to.trim());
        System.out.printf("Assunto: %s%n", subject.toUpperCase());
        System.out.printf("Mensagem: %s%n", message);
    }
}
