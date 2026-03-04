package com.gildedrose.updater.impl;

import com.gildedrose.data.Item;
import com.gildedrose.updater.ItemUpdater;

/**
 * Antes dad data de venda qualidade aumenta em 1 por dia e sellin diminui 1 por dia
 * Após data de venda qualidade aumenta em 2 por dia e sellin diminui 1 por dia
 * Qualidade nunca pode ser maior que 50
 */
public class AgedBrieUpdater implements ItemUpdater {

    @Override
    public void update(Item item) {
        increaseQuality(item);
        item.sellIn--;

        if (item.sellIn < 0) {
            increaseQuality(item);
        }
    }

    private void increaseQuality(Item item) {
        if (item.quality < 50) {
            item.quality++;
        }
    }
}

