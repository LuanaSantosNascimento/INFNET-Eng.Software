package selenium.automationexercise.core;


import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;
import java.util.List;

public abstract class BasePage {
    private static final String SRC_TEST_RESOURCES_SCREENSHOTS =
            "src/test/resources/screenshots/";
    protected WebDriver driver;
    protected WebDriverWait wait;

    protected BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(3));
    }

    public WebElement $(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public List<WebElement> $$(By locator) {
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
        return driver.findElements(locator);
    }

    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }

    protected void type(By locator, String text) {
        WebElement el = $(locator);
        el.clear();
        el.sendKeys(text);
    }

    protected void select(By locator, String text) {
        WebElement el = $(locator);
        Select select = new Select(el);
        select.selectByVisibleText(text);
    }

    protected void scrollToElement(By locator) {
        WebElement element = $(locator);
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
    }

    protected void takeScreenshot(String name) {
        try {
            File directory = new File(SRC_TEST_RESOURCES_SCREENSHOTS);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
            String filePath = SRC_TEST_RESOURCES_SCREENSHOTS + name + "_" + timestamp + ".png";

            File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            Files.copy(screenshot.toPath(),
                    new File(filePath).toPath(),
                    StandardCopyOption.REPLACE_EXISTING);

            System.out.println("Screenshot saved in: " + filePath);

        } catch (IOException e) {
            System.out.println("Failed to save screenshot: " + e.getMessage());
        }
    }

    protected String getInputValidationMessage(By locator) {
        WebElement inputElement = $(locator);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (String) js.executeScript(
                "return arguments[0].validationMessage;", inputElement);
    }

    protected void clickPorJS(By by) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", $(by));
    }

}