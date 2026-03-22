package org.example.banco.selenium.test;

import org.example.banco.selenium.core.BaseTest;
import org.example.banco.selenium.page.ContaBancariaPage;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.openqa.selenium.By;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ContaBancariaSeleniumTest extends BaseTest {

    private ContaBancariaPage paginaPrincipal;

    @LocalServerPort
    private int port;

    @BeforeEach
    public void setUp() {
        paginaPrincipal = new ContaBancariaPage(driver);
        driver.get("http://localhost:" + port + "/index.html");
    }

    @ParameterizedTest(name = "Titular={0}, Saldo={1}")
    @CsvSource({
            "Lucas Almeida, 1000",
            "Maria Anastacia, 500",
            "Carlos Santos, 2000"
    })
    @DisplayName("Deve criar conta com sucesso.")
    public void deveCriarContaComSucesso(String nomeTitular, String saldoInicial) {
        paginaPrincipal.criarConta(nomeTitular, saldoInicial);

        assertTrue(paginaPrincipal.isContaNaTabela(nomeTitular));
    }

    @Test
    @DisplayName("Deve exibir mensagem de erro ao tentar criar conta sem informar nome.")
    public void naoDeveCriarContaComNomeNulo() {
        paginaPrincipal.criarConta("", "1000");
        Assertions.assertEquals("Preencha este campo.", paginaPrincipal.getMensagemDeValidacaoDoInputNome());
    }

    @Test
    @DisplayName("Deve exibir mensagem de erro ao tentar criar conta com saldo negativo.")
    public void naoDeveCriarContaComSaldoNegativo() {
        paginaPrincipal.criarConta("Maria ALice", "-100");
        assertTrue(paginaPrincipal.getMensagemDeValidacaoDoInputSaldo().contains("O valor deve ser maior ou igual a 0."));
    }

    @ParameterizedTest(name = "Titular={0}, SaldoInicial={1}, SaldoFinal={2}")
    @CsvSource({
            "Eliete Oliveira, 1500, 2, Eliete O Silva",
            "Alberto Martins, 500, 5000, Humberto Martins",
            "Juarez Santos, 2000, 0, Juarez Santos OLiveira"
    })
    @DisplayName("Deve editar conta com sucesso.")
    public void deveEditarContaComSucesso(String titular, String saldoInicial, String saldoFinal, String nomeTitularAlterado) {
        paginaPrincipal.criarConta(titular, saldoInicial);
        paginaPrincipal.clicarBotaoEditarConta(titular);
        paginaPrincipal.editarConta(titular, nomeTitularAlterado, saldoFinal);
        assertTrue(paginaPrincipal.isContaNaTabela(nomeTitularAlterado));
    }

    @ParameterizedTest(name = "Titular={0}")
    @CsvSource({
            "Pedro Oliveira",
            "Carlos Lima",
            "Ana Costa"
    })
    @DisplayName("Deve excluir conta com sucesso.")
    public void deveExcluirContaComSucesso(String titular) {
        paginaPrincipal.clicarBotaoExcluirConta(titular);
        paginaPrincipal.excluirConta(titular);
        assertTrue
                (driver.findElements(By.xpath("//td[text()='Peter Parker']")).isEmpty());

    }
}
