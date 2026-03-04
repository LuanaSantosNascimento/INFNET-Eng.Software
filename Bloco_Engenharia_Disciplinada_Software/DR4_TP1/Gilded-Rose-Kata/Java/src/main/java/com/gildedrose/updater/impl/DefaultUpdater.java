package com.gildedrose.updater.impl;


import com.gildedrose.data.Item;
import com.gildedrose.updater.ItemUpdater;

/**
 * Qualidade cai normalmente em 1 ponto por dia, mas após a data de: venda,
 * a qualidade cai em 2 pontos por dia.
 * sellin é decrementado em 1 a cada dia
 */
public class DefaultUpdater implements ItemUpdater {

    @Override
    public void update(Item item) {
        decreaseQuality(item);
        item.sellIn--;

        if (item.sellIn < 0) {
            decreaseQuality(item);
        }
    }

    private void decreaseQuality(Item item) {
        if (item.quality > 0) {
            item.quality--;
        }
    }
}

