package com.gildedrose;

import com.gildedrose.data.Item;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GildedRoseTest {

    // Teste inicial
    @Test
    void foo() {
        Item[] items = new Item[]{new Item("foo", 0, 0)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("foo", app.items[0].name);
    }

    // DefaultUpdater
    @Test
    @DisplayName("Item normal: qualidade e sellIn decrescem normalmente")
    void testRegularItem() {
        Item[] items = new Item[]{new Item("Normal Item", 10, 20)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Normal Item", app.items[0].name);
        assertEquals(9, app.items[0].sellIn);
        assertEquals(19, app.items[0].quality);
    }

    @Test
    @DisplayName("Item normal: qualidade nunca fica negativa")
    void testQualityNeverNegative() {
        Item[] items = new Item[]{new Item("Normal Item", -5, 0)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Normal Item", app.items[0].name);
        assertEquals(-6, app.items[0].sellIn);
        assertEquals(0, app.items[0].quality);
    }

    //AgedBrieUpdater
    @Test
    @DisplayName("Aged Brie: qualidade aumenta com o tempo")
    void testAgedBrieIncreases() {
        Item[] items = new Item[]{new Item("Aged Brie", 10, 20)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Aged Brie", app.items[0].name);
        assertEquals(9, app.items[0].sellIn);
        assertEquals(21, app.items[0].quality);
    }

    @Test
    @DisplayName("Aged Brie: qualidade aumenta em dobro após data de venda")
    void testAgedBrieAfterSellDate() {
        Item[] items = new Item[]{new Item("Aged Brie", -1, 20)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Aged Brie", app.items[0].name);
        assertEquals(-2, app.items[0].sellIn);
        assertEquals(22, app.items[0].quality);
    }

    @Test
    @DisplayName("Aged Brie: qualidade nunca excede 50")
    void testQualityNeverExceeds50() {
        Item[] items = new Item[]{new Item("Aged Brie", 10, 50)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Aged Brie", app.items[0].name);
        assertEquals(9, app.items[0].sellIn);
        assertEquals(50, app.items[0].quality);
    }

    //SulfurasUpdater
    @Test
    @DisplayName("Sulfuras: qualidade e sellIn nunca mudam")
    void testSulfurasNeverChanges() {
        Item[] items = new Item[]{new Item("Sulfuras, Hand of Ragnaros", 10, 80)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Sulfuras, Hand of Ragnaros", app.items[0].name);
        assertEquals(10, app.items[0].sellIn);
        assertEquals(80, app.items[0].quality);
    }


    //BackstagePassUpdater
    @Test
    @DisplayName("Backstage Pass: incrementa normalmente acima de 10 dias")
    void testBackstagePassIncrementsNormally() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Backstage passes to a TAFKAL80ETC concert", app.items[0].name);
        assertEquals(14, app.items[0].sellIn);
        assertEquals(21, app.items[0].quality);
    }

    @Test
    @DisplayName("Backstage Pass: incrementa em dobro entre 10 e 6 dias")
    void testBackstagePassIncrementsDoubleBeforeTenDays() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Backstage passes to a TAFKAL80ETC concert", app.items[0].name);
        assertEquals(9, app.items[0].sellIn);
        assertEquals(22, app.items[0].quality);
    }

    @Test
    @DisplayName("Backstage Pass: incrementa em triplo entre 5 e 0 dias")
    void testBackstagePassIncrementsTripleBeforeFiveDays() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Backstage passes to a TAFKAL80ETC concert", app.items[0].name);
        assertEquals(4, app.items[0].sellIn);
        assertEquals(23, app.items[0].quality);
    }

    @Test
    @DisplayName("Backstage Pass: qualidade zera após o show")
    void testBackstagePassZeroAfterConcert() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Backstage passes to a TAFKAL80ETC concert", app.items[0].name);
        assertEquals(-2, app.items[0].sellIn);
        assertEquals(0, app.items[0].quality);
    }

    //    ConjuredItemUpdater
    @Test
    @DisplayName("Conjured: decai o dobro da qualidade por dia")
    void testConjuredItemDecaysTwiceAsfast() {
        Item[] items = new Item[]{new Item("Conjured Mana Cake", 10, 20)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Conjured Mana Cake", app.items[0].name);
        assertEquals(18, app.items[0].quality);
    }

    @Test
    @DisplayName("Conjured: qualidade nunca fica negativa")
    void testConjuredItemQualityNeverNegative() {
        Item[] items = new Item[]{new Item("Conjured Scroll", 10, 3)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Conjured Scroll", app.items[0].name);
        assertEquals(9, app.items[0].sellIn);
        assertEquals(1, app.items[0].quality);
    }

    @Test
    @DisplayName("Conjured: qualidade zera ao decair de 1")
    void testConjuredItemQualityZeroWhenDecayingFromOne() {
        Item[] items = new Item[]{new Item("Conjured Potion", 10, 1)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Conjured Potion", app.items[0].name);
        assertEquals(9, app.items[0].sellIn);
        assertEquals(0, app.items[0].quality);
    }

    @Test
    @DisplayName("Conjured: qualidade permanece zero")
    void testConjuredItemQualityRemainZero() {
        Item[] items = new Item[]{new Item("Conjured Boots", 10, 0)};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals("Conjured Boots", app.items[0].name);
        assertEquals(0, app.items[0].quality);
    }
}
