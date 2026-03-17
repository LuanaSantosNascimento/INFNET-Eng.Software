package org.example.banco.selenium.page;

import org.example.banco.selenium.core.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class ContaBancariaPage extends BasePage {

    private final By inputNome = By.id("nome");
    private final By inputSaldo = By.id("saldo");
    private final By btnCriarConta = By.xpath("//form[@id='form-criar']/div/button");

    private final By tabelaContas = By.id("tabela-contas");

    private final By inputEditarNome = By.id("editar-nome");
    private final By inputEditarSaldo = By.id("editar-saldo");
    private final By btnSalvarEdicao = By.id("btn-salvar-edicao");

    private final By btnConfirmarExclusao = By.id("btn-confirmar-excluir");

    public ContaBancariaPage(WebDriver driver) {
        super(driver);
    }

    public void criarConta(String titular, String saldo) {
        String nomeTitularNormalizado = getNomeTitularNormalizado(titular);
        type(inputNome, titular);
        type(inputSaldo, saldo);
        takeScreenshot("0.Criar_Conta_Preenchimento_Dados_" + nomeTitularNormalizado);
        click(btnCriarConta);
        takeScreenshot("0.Conta_Criada_" + nomeTitularNormalizado);
    }

    public void clicarBotaoEditarConta(String titular) {
        String nomeTitularNormalizado = getNomeTitularNormalizado(titular);
        WebElement botaoAbrirModal = driver.findElement(
                By.xpath("//td[text()='" + titular + "']/..//button[contains(text(), 'Editar')]")
        );
        botaoAbrirModal.click();
        takeScreenshot("1.Modal_Editar_Conta" + nomeTitularNormalizado);
    }

    public void editarConta(String nomeInicial, String novoNome, String novoSaldo) {
        String nomeTitularNormalizado = getNomeTitularNormalizado(nomeInicial);
        type(inputEditarNome, novoNome);
        type(inputEditarSaldo, novoSaldo);

        WebElement btnConfirmar = wait.until(ExpectedConditions.elementToBeClickable(btnSalvarEdicao));
        btnConfirmar.click();
        takeScreenshot("1.Modal_Editar_Conta_Dados_Alterados" + nomeTitularNormalizado);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(String.format("//td[text()='%s']/..", novoNome))));
        takeScreenshot("1.Modal_Editar_Conta_Finalizado" + nomeTitularNormalizado);

    }

    public void clicarBotaoExcluirConta(String nomeConta) {
        String nomeTitularNormalizado = getNomeTitularNormalizado(nomeConta);

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(String.format("//td[text()='%s']/..", nomeConta))));
        WebElement botaoAbrirModal = driver.findElement(By.xpath("//td[text()='" + nomeConta + "']/..//button[contains(text(), 'Excluir')]"));
        botaoAbrirModal.click();
        takeScreenshot("2.Modal_Excluir_Conta" + nomeTitularNormalizado);

    }

    public void excluirConta(String nomeConta) {
        String nomeTitularNormalizado = getNomeTitularNormalizado(nomeConta);

        WebElement a = getLinhaDaConta(nomeConta);
        WebElement btnCOnfirmar = wait.until(ExpectedConditions.elementToBeClickable(btnConfirmarExclusao));
        btnCOnfirmar.click();
        wait.until(ExpectedConditions.stalenessOf(a));
        takeScreenshot("2.Modal_Excluir_Conta_Confirmado" + nomeTitularNormalizado);
    }

    public boolean isContaNaTabela(String nomeConta) {
        return getLinhaDaConta(nomeConta) != null;
    }

    public WebElement getLinhaDaConta(String nomeConta) {
        return $(tabelaContas).findElement(By.xpath(String.format("//td[text()='%s']/..", nomeConta)));
    }

    public String getMensagemDeValidacaoDoInputNome() {
        return getInputValidationMessage(inputNome);
    }

    public String getMensagemDeValidacaoDoInputSaldo() {
        return getInputValidationMessage(inputSaldo);
    }

    private String getNomeTitularNormalizado(String titular) {
        String nomeTitularNormalizado;

        if ((titular != null) && (!titular.trim().isEmpty())) {
            nomeTitularNormalizado = titular.trim().replaceAll(" ", "_");
        } else {
            nomeTitularNormalizado = "NOME_INVALIDO";
        }
        return nomeTitularNormalizado;
    }
}
