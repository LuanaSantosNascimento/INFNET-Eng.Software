package org.example.banco.util;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class InputValidatorTest {

    @Test
    @DisplayName("Deve retornar valor inteiro quando entrada é válida")
    void lerInt_retornaValorQuandoValido() {
        InputValidator validator = criarValidatorComEntrada("10\n");

        int resultado = validator.lerInt("Opcao: ");

        assertThat(resultado).isEqualTo(10);
    }

    @Test
    @DisplayName("Deve retornar -1 quando entrada inteira é inválida")
    void lerInt_retornaMenosUmQuandoInvalido() {
        InputValidator validator = criarValidatorComEntrada("abc\n\n");

        int resultado = validator.lerInt("Opcao: ");

        assertThat(resultado).isEqualTo(-1);
    }

    @Test
    @DisplayName("Deve retornar valor Long quando entrada é válida")
    void lerLong_retornaValorQuandoValido() {
        InputValidator validator = criarValidatorComEntrada("99\n");

        Long resultado = validator.lerLong("Id: ");

        assertThat(resultado).isEqualTo(99L);
    }

    @Test
    @DisplayName("Deve retornar null quando entrada Long é inválida")
    void lerLong_retornaNullQuandoInvalido() {
        InputValidator validator = criarValidatorComEntrada("abc\n\n");

        Long resultado = validator.lerLong("Id: ");

        assertThat(resultado).isNull();
    }

    @Test
    @DisplayName("Deve retornar valor decimal quando entrada é válida")
    void lerDouble_retornaValorQuandoValido() {
        InputValidator validator = criarValidatorComEntrada("10,5\n");

        Double resultado = validator.lerDouble("Saldo: ");

        assertThat(resultado).isEqualTo(10.5);
    }

    @Test
    @DisplayName("Deve retornar null quando entrada decimal é inválida")
    void lerDouble_retornaNullQuandoInvalido() {
        InputValidator validator = criarValidatorComEntrada("abc\n\n");

        Double resultado = validator.lerDouble("Saldo: ");

        assertThat(resultado).isNull();
    }

    @Test
    @DisplayName("Deve retornar null quando string está vazia")
    void lerString_retornaNullQuandoVazio() {
        InputValidator validator = criarValidatorComEntrada("\n");

        String resultado = validator.lerString("Nome: ");

        assertThat(resultado).isNull();
    }

    @Test
    @DisplayName("Deve retornar texto quando string está preenchida")
    void lerString_retornaTextoQuandoPreenchido() {
        InputValidator validator = criarValidatorComEntrada("Ana\n");

        String resultado = validator.lerString("Nome: ");

        assertThat(resultado).isEqualTo("Ana");
    }

    @Test
    @DisplayName("Deve validar se saldo é positivo")
    void validarSaldoPositivo_validaValores() {
        InputValidator validator = criarValidatorComEntrada("\n");

        assertThat(validator.validarSaldoPositivo(10.0)).isTrue();
        assertThat(validator.validarSaldoPositivo(0.0)).isTrue();
        assertThat(validator.validarSaldoPositivo(-1.0)).isFalse();
        assertThat(validator.validarSaldoPositivo(null)).isFalse();
    }

    private InputValidator criarValidatorComEntrada(String entrada) {
        ByteArrayInputStream inputStream = new ByteArrayInputStream(entrada.getBytes(StandardCharsets.UTF_8));
        return new InputValidator(new Scanner(inputStream));
    }
}
