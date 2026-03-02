package selenium.automationexercise.test;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import selenium.automationexercise.core.BaseTest;
import selenium.automationexercise.pages.ContactUsPage;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ContactUsPageTest extends BaseTest {

    @Test
    @DisplayName("Should fill contact us form sucessfully")
    void contactUsForm() {
        ContactUsPage contactPage = getContactUsPage();

        String expectedMessage = "Success! Your details have been submitted successfully.";
        String actualMessage = contactPage.getSuccessMessageText();

        assertEquals(
                expectedMessage,
                actualMessage,
                "The feedback submission success message should be displayed");
    }

    private ContactUsPage getContactUsPage() {
        ContactUsPage contactPage = new ContactUsPage(driver);
        contactPage.openPage()
                .waitPage()
                .fillForm(
                        "Test User",
                        "automacao@selenium.com",
                        "Feedback de Automação",
                        "Projeto de Bloco - Teste automatizado com Selenium no padrão Page Objects."
                );

        contactPage.uploadFile("src/test/resources/contact-us-upload-file.txt");

        contactPage.submitForm();
        return contactPage;
    }
}