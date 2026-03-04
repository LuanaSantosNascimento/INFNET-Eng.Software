package com.gildedrose.updater.impl;

import com.gildedrose.data.Item;
import com.gildedrose.updater.ItemUpdater;

/**
 * Incremento de qualidade:
 * 1 - normalmente
 * 2 - quando faltam 10 dias ou menos
 * 3 - quando faltam 5 dias ou menos
 * 0 - após o concerto
 */
public class BackstagePassUpdater implements ItemUpdater {

    @Override
    public void update(Item item) {
        increaseQuality(item);

        if (item.sellIn < 11) {
            increaseQuality(item);
        }

        if (item.sellIn < 6) {
            increaseQuality(item);
        }

        item.sellIn--;

        if (item.sellIn < 0) {
            item.quality = 0;
        }
    }

    private void increaseQuality(Item item) {
        if (item.quality < 50) {
            item.quality++;
        }
    }
}

