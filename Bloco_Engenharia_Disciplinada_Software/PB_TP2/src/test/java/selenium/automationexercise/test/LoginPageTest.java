package selenium.automationexercise.test;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import selenium.automationexercise.core.BaseTest;
import selenium.automationexercise.pages.HomePage;
import selenium.automationexercise.pages.LoginPage;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LoginPageTest extends BaseTest {

    @Test
    @DisplayName("Should login sucessfully")
    void login() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.openPage()
                .fillLoginEmailField("user_1765134212620@test.com")
                .fillPasswordField("at-dr1-senha")
                .login();
        HomePage homePage = new HomePage(driver);


        assertEquals("Logged in as Assesment User", homePage.getMessage());
        assertTrue(homePage.logoutButton().isDisplayed());
    }

    @Test
    @DisplayName("Should show error message when login fails - invalid password")
    void loginWithError() {
        LoginPage loginPage = new LoginPage(driver);
        String errorMessage = loginPage.openPage()
                .fillLoginEmailField("user_1765134212620@test.com")
                .fillPasswordField("wrong-password")
                .login().getErrorMessage();


        assertEquals("Your email or password is incorrect!", errorMessage);
    }

    @Test
    @DisplayName("Should show error message when login fails - blank password")
    void loginWithErrorBlankPassword() {
        LoginPage loginPage = new LoginPage(driver);
        String errorMessage = loginPage.openPage()
                .fillLoginEmailField("user_1765134212620@test.com")
                .fillPasswordField(" ")
                .login().getErrorMessage();


        assertEquals("Your email or password is incorrect!", errorMessage);
    }

    @Test
    @DisplayName("Should show error message when login fails - invalid email")
    void loginWithErrorInvalidEmail() {
        LoginPage loginPage = new LoginPage(driver);
        String errorMessage = loginPage.openPage()
                .fillLoginEmailField("    @test.com")
                .fillPasswordField(" ")
                .login().getEmailValidationMenssage();


        assertEquals("Insira uma parte seguida por \"@\". \"@test.com\" está incompleto.", errorMessage);
    }

    @Test
    @DisplayName("Should show error message when login fails - password not informed")
    void loginWithErrorPasswordNotInformed() {
        LoginPage loginPage = new LoginPage(driver);
        String errorMessage = loginPage.openPage()
                .fillLoginEmailField("1111111@test.com")
                .login().getPasswordValidationMenssage();

        assertEquals("Preencha este campo.", errorMessage);
    }

    @Test
    @DisplayName("Should show error message when login fails - email not informed")
    void loginWithErrorEmailNotInformed() {
        LoginPage loginPage = new LoginPage(driver);
        String errorMessage = loginPage.openPage()
                .fillPasswordField("1111111")
                .login().getEmailValidationMenssage();

        assertEquals("Preencha este campo.", errorMessage);
    }
}
