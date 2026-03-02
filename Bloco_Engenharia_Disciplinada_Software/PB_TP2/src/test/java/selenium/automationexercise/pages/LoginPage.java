package selenium.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import selenium.automationexercise.core.BasePage;

public class LoginPage extends BasePage {

    private static final String URL = "https://automationexercise.com/login";
    private final By emailField = By.xpath("//input[@data-qa='login-email']");
    private final By passwordField = By.xpath("//input[@data-qa='login-password']");
    private final By buttonSignIn = By.xpath("//button[@data-qa='login-button']");
    private final By errorMessage = By.xpath("//p[text()='Your email or password is incorrect!']");
    private final By signupEmailField = By.xpath("//input[@data-qa='signup-email']");
    private final By signupNameField = By.xpath("//input[@data-qa='signup-name']");
    private final By buttonSignUp = By.xpath("//button[@data-qa='signup-button']");


    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public LoginPage openPage() {
        driver.get(URL);
        return this;
    }

    public LoginPage fillLoginEmailField(String email) {
        type(emailField, email);
        return this;
    }

    public LoginPage fillSignupEmailField(String email) {
        type(signupEmailField, email);
        return this;
    }

    public LoginPage fillSignupNameField(String name) {
        type(signupNameField, name);
        return this;
    }

    public LoginPage signUp() {
        click(buttonSignUp);
        takeScreenshot("signup-inicial-form-submitted");
        return this;
    }


    public LoginPage fillPasswordField(String password) {
        type(passwordField, password);
        return this;
    }

    public void waitErrorMessage() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(errorMessage));
        takeScreenshot("login-error-message");
    }

    public String getErrorMessage() {
        waitErrorMessage();
        return $(errorMessage).getText();
    }

    public LoginPage login() {
        click(buttonSignIn);
        return this;
    }

    public String getEmailValidationMenssage() {
        return getInputValidationMessage(emailField);
    }

    public String getPasswordValidationMenssage() {
        return getInputValidationMessage(passwordField);
    }
}
