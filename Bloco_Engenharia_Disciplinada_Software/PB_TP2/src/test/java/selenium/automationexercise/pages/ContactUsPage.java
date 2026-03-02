package selenium.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import selenium.automationexercise.core.BasePage;

import java.io.File;

public class ContactUsPage extends BasePage {

    private static final String URL = "https://automationexercise.com/contact_us";
    private final By inputName = By.cssSelector("input[data-qa='name']");
    private final By inputEmail = By.cssSelector("input[data-qa='email']");
    private final By inputSubject = By.cssSelector("input[data-qa='subject']");
    private final By txtAreaMessage = By.cssSelector("textarea[data-qa='message']");
    private final By inputFile = By.name("upload_file");
    private final By btnSubmit = By.cssSelector("input[data-qa='submit-button']");

    private final By successMessage = By.cssSelector(".status.alert.alert-success");

    public ContactUsPage(WebDriver driver) {
        super(driver);
    }

    public ContactUsPage openPage() {
        driver.get(URL);
        return this;
    }

    public ContactUsPage waitPage() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(txtAreaMessage));
        return this;
    }

    public void fillForm(String name, String email, String subject, String message) {
        $(inputName).sendKeys(name);
        $(inputEmail).sendKeys(email);
        $(inputSubject).sendKeys(subject);
        $(txtAreaMessage).sendKeys(message);
    }

    public void uploadFile(String relativePath) {
        File file = new File(relativePath);
        $(inputFile).sendKeys(file.getAbsolutePath());
    }

    public void submitForm() {
        $(btnSubmit).click();

        wait.until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().accept();
    }

    public String getSuccessMessageText() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(successMessage));
        takeScreenshot("form-submission-success-message");
        return $(successMessage).getText();
    }
}