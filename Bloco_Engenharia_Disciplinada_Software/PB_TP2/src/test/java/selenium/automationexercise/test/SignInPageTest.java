package selenium.automationexercise.test;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import selenium.automationexercise.core.BaseTest;
import selenium.automationexercise.pages.AccountCreatedPage;
import selenium.automationexercise.pages.LoginPage;
import selenium.automationexercise.pages.SignInPage;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SignInPageTest extends BaseTest {

    @Test
    @DisplayName("Should create a new user successfully")
    void createNewUser() throws InterruptedException {
        startLoginPage();
        SignInPage signup = new SignInPage(driver);
        AccountCreatedPage accountCreated = new AccountCreatedPage(driver);
        signup.waitPage();

        signup.clickMrGender()
                .fillPassword("at-dr1-senha")
                .fillDateOfBirthField(LocalDate.of(1990, 5, 15))
                .clickNewsletterElement()
                .clickOptinElement()
                .fillFirstNameField("Test")
                .fillLastNameField("Tester")
                .fillCompanyField("Infnet")
                .fillAddressField("123 Test St")
                .fillCountryField("New Zealand")
                .fillStateField("New Zealand")
                .fillCityField("Akaroa")
                .fillZipcodeField("7581")
                .fillMobileNumberField("64211876543")
                .clickSignInButton();

        assertEquals(
                "ACCOUNT CREATED!",
                accountCreated.getMessage(),
                "A mensagem final não corresponde."
        );
    }

    private void startLoginPage() {
        String email = "user_" + System.currentTimeMillis() + "@test.com";
        System.out.println("Email createed: " + email);

        new LoginPage(driver).openPage()
                .fillSignupNameField("Assesment User")
                .fillSignupEmailField(email)
                .signUp();
    }
}
