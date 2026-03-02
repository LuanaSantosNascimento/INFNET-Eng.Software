package selenium.automationexercise.test;

import org.junit.jupiter.api.Test;
import selenium.automationexercise.core.BaseTest;
import selenium.automationexercise.pages.CartPage;
import selenium.automationexercise.pages.ProductPage;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ProductPageTest extends BaseTest {

    @Test
    void deveAdicionarProdutoAoCarrinhoComSucesso() {

        ProductPage productsPage = new ProductPage(driver);
        productsPage.openPage()
                .waitPage();


        productsPage.searchProduct("Blue Top");
        productsPage.addFirstProductToCart();
        CartPage cartPage = productsPage.viewCart();

        assertTrue(cartPage.isCartPageLoaded());
        assertEquals(
                "Blue Top",
                cartPage.getFirstProductName(),
                "The product in the cart should be the one that was added");
    }
}