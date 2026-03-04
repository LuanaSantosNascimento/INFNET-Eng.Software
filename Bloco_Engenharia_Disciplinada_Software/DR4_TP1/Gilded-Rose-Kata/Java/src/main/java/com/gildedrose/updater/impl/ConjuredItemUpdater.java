package com.gildedrose.updater.impl;

import com.gildedrose.data.Item;
import com.gildedrose.updater.ItemUpdater;

/**
 * Qualidade cai  2 pontos por dia e qualidade nunca pode ser negativa
 */
public class ConjuredItemUpdater implements ItemUpdater {

    @Override
    public void update(Item item) {
        decreaseQualityByDouble(item);
        item.sellIn--;

    }

    private void decreaseQualityByDouble(Item item) {
        if (item.quality > 0) {
            item.quality -= 2;

            if (item.quality < 0) {
                item.quality = 0;
            }
        }
    }
}

