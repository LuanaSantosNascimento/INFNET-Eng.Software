package org.tp.exceptions;

public class ValidationException extends IllegalArgumentException {
    private final String field;
    private static final String DEFAULT_MESSAGE = "Erro de validação no campo";

    public ValidationException(String field, String message) {
        super(String.format("%s '%s': %s", DEFAULT_MESSAGE, field, message));
        this.field = field;
    }

    public String getField() {
        return field;
    }
}
