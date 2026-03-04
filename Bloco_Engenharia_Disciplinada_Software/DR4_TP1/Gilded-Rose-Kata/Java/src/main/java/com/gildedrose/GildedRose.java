package com.gildedrose;

import com.gildedrose.data.Item;
import com.gildedrose.updater.ItemUpdater;
import com.gildedrose.updater.ItemUpdaterRegistry;

class GildedRose {
    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        for (Item item : items) {
            ItemUpdater updater = ItemUpdaterRegistry.getUpdater(item);
            updater.update(item);
        }
    }
}
