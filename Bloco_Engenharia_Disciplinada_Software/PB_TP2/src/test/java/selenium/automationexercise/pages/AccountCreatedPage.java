package selenium.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import selenium.automationexercise.core.BasePage;

public class AccountCreatedPage extends BasePage {

    private final By accountCreatedMsg = By.cssSelector("h2[data-qa='account-created']");

    public AccountCreatedPage(WebDriver driver) {
        super(driver);
    }

    public String getMessage() {
        waitCreatedMessage();
        return $(accountCreatedMsg).getText();
    }

    public void waitCreatedMessage() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(accountCreatedMsg));
        takeScreenshot("created-account-message");
    }
}
