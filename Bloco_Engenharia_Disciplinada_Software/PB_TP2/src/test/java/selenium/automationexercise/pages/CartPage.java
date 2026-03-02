package selenium.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import selenium.automationexercise.core.BasePage;

public class CartPage extends BasePage {

    private final By cartTable = By.id("cart_info_table");
    private final By productDescription = By.cssSelector(".cart_description h4 a");

    public CartPage(WebDriver driver) {
        super(driver);
    }

    public boolean isCartPageLoaded() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(cartTable));
        return $(cartTable).isDisplayed();
    }

    public String getFirstProductName() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(productDescription));
        takeScreenshot("product-on-cart");
        return $(productDescription).getText();
    }
}