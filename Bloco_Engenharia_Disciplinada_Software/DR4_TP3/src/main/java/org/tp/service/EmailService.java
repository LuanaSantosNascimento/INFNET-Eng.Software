package org.tp.service;

public interface EmailService {
    void sendEmail(String to, String subject, String message);
}
