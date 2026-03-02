package selenium.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import selenium.automationexercise.core.BasePage;

public class HomePage extends BasePage {

    private final By loggedInAs = By.xpath("//a[contains(text(),'Logged in as')]");
    private final By logoutButton = By.xpath("//a[contains(text(),'Logout')]");
    private final By contactUsMenu = By.xpath("//a[contains(text(),'Contact us')]");

    public HomePage(WebDriver driver) {
        super(driver);
    }

    public String getMessage() {
        waitLoggedInMessage();
        return $(loggedInAs).getText();
    }
    public ContactUsPage goToContactUs() {
        $(contactUsMenu).click();
        takeScreenshot("navegando-para-contato");
        return new ContactUsPage(driver);
    }

    public void waitLoggedInMessage() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(loggedInAs));
        takeScreenshot("logged-in-message");
    }

    public WebElement logoutButton() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(logoutButton));
    }
}
