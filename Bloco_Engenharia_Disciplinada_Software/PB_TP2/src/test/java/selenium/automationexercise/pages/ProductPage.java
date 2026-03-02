package selenium.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import selenium.automationexercise.core.BasePage;

public class ProductPage extends BasePage {

    private static final String URL = "https://automationexercise.com/products";
    private final By inputSearch = By.id("search_product");
    private final By btnSubmitSearch = By.id("submit_search");
    private final By firstProductAddToCart = By.cssSelector(".features_items .add-to-cart");
    private final By linkViewCart = By.xpath("//u[contains(text(),'View Cart')]");

    public ProductPage(WebDriver driver) {
        super(driver);
    }

    public void searchProduct(String productName) {
        $(inputSearch).sendKeys(productName);
        clickPorJS(btnSubmitSearch);
        takeScreenshot("founded products-" + productName);
    }
    public void waitPage() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(firstProductAddToCart));
    }

    public void addFirstProductToCart() {
        wait.until(ExpectedConditions.elementToBeClickable(firstProductAddToCart));
        clickPorJS(firstProductAddToCart);
    }

    public CartPage viewCart() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(linkViewCart)).click();
        return new CartPage(driver);
    }

    public ProductPage openPage() {
        driver.get(URL);
        return this;
    }
}