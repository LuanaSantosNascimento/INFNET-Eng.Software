package org.example.banco.exception;

public class ContaNotFoundException extends RuntimeException {

    public ContaNotFoundException(Long id) {
        super(String.format("Conta com ID '%d' não encontrada", id));
    }
}
