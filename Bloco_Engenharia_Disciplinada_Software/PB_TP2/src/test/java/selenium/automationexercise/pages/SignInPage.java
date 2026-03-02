package selenium.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import selenium.automationexercise.core.BasePage;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;

public class SignInPage extends BasePage {

    private static final String URL = "https://automationexercise.com/signup";
    private By fieldMrGender = By.id("id_gender1");
    private By fieldPassword = By.id("password");
    private By fieldDays = By.id("days");
    private By fieldMonths = By.id("months");
    private By fieldYears = By.id("years");
    private By fieldNewsletter = By.id("newsletter");
    private By fieldOptin = By.id("optin");

    private By fieldFirstName = By.id("first_name");
    private By fieldLastName = By.id("last_name");
    private By fieldCompany = By.id("company");
    private By fieldAddress1 = By.id("address1");
    private By fieldCountry = By.id("country");
    private By fieldState = By.id("state");
    private By fieldCity = By.id("city");
    private By fieldZipcode = By.id("zipcode");
    private By fieldMobileNumber = By.id("mobile_number");
    private By createAccountButton = By.cssSelector("button[data-qa='create-account']");

    public SignInPage(WebDriver driver) {
        super(driver);
    }

    public SignInPage openPage() {
        driver.get(URL);
        return this;
    }

    public SignInPage fillFirstNameField(String name) {
        scrollToElement(fieldFirstName);
        type(fieldFirstName, name);
        return this;
    }

    public SignInPage fillLastNameField(String name) {
        scrollToElement(fieldLastName);
        type(fieldLastName, name);
        return this;
    }

    public SignInPage fillPassword(String password) {
        scrollToElement(fieldPassword);
        type(fieldPassword, password);
        return this;
    }

    public SignInPage fillDateOfBirthField(LocalDate brithdate) {
        scrollToElement(fieldDays);
        select(fieldDays, String.valueOf(brithdate.getDayOfMonth()));
        select(fieldMonths, brithdate.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH));
        select(fieldYears, String.valueOf(brithdate.getYear()));
        return this;
    }

    public SignInPage clickNewsletterElement() {
        scrollToElement(fieldNewsletter);
        click(fieldNewsletter);
        return this;
    }

    public SignInPage clickOptinElement() {
        scrollToElement(fieldOptin);
        click(fieldOptin);
        return this;
    }

    public SignInPage fillCompanyField(String company) {
        scrollToElement(fieldCompany);
        type(fieldCompany, company);
        return this;
    }

    public SignInPage fillAddressField(String address) {
        scrollToElement(fieldAddress1);
        type(fieldAddress1, address);
        return this;
    }

    public SignInPage fillCountryField(String country) {
        scrollToElement(fieldCountry);
        select(fieldCountry, country);
        return this;
    }

    public SignInPage fillStateField(String state) {
        scrollToElement(fieldState);
        type(fieldState, state);
        return this;
    }

    public SignInPage fillCityField(String city) {
        scrollToElement(fieldCity);
        type(fieldCity, city);
        return this;
    }

    public SignInPage fillZipcodeField(String zipcode) {
        scrollToElement(fieldZipcode);
        type(fieldZipcode, zipcode);
        return this;
    }

    public SignInPage fillMobileNumberField(String number) {
        scrollToElement(fieldMobileNumber);
        type(fieldMobileNumber, number);
        return this;
    }

    public SignInPage clickMrGender() {
        scrollToElement(fieldMrGender);
        click(fieldMrGender);
        return this;
    }

    public void waitPage() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(fieldMrGender));
    }

    public void clickSignInButton() throws InterruptedException {
        Thread.sleep(2000);
        takeScreenshot("signup-final-form-submitted");
        click(createAccountButton);
    }
}
