package com.gildedrose.updater;

import com.gildedrose.data.Item;
import com.gildedrose.updater.impl.AgedBrieUpdater;
import com.gildedrose.updater.impl.BackstagePassUpdater;
import com.gildedrose.updater.impl.ConjuredItemUpdater;
import com.gildedrose.updater.impl.DefaultUpdater;
import com.gildedrose.updater.impl.SulfurasUpdater;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;


//Registra o mapeamento de tipos de item para suas estratégias de atualização.
public class ItemUpdaterRegistry {

    private static final Map<Predicate<Item>, ItemUpdater> registry = new HashMap<>();

    static {
        register(ItemUpdaterRegistry::isSulfuras, new SulfurasUpdater());
        register(ItemUpdaterRegistry::isAgedBrie, new AgedBrieUpdater());
        register(ItemUpdaterRegistry::isBackstagePass, new BackstagePassUpdater());
        register(ItemUpdaterRegistry::isConjured, new ConjuredItemUpdater());
//        register(ItemUpdaterRegistry::isNewItem, new NewItemUpdater());
    }

    //Retorna o updater correspondente ao item, ou DefaultUpdater caso não haja um correspondente registrado.
    public static ItemUpdater getUpdater(Item item) {
        return registry.entrySet().stream()
                .filter(entry -> entry.getKey().test(item))
                .map(Map.Entry::getValue)
                .findFirst()
                .orElse(new DefaultUpdater());
    }

    //Permite registrar novos tipos de item/updater dinamicamente.

    public static void register(Predicate<Item> predicate, ItemUpdater updater) {
        registry.put(predicate, updater);
    }

//    private static boolean isNewItem(Item item) {
//        return item.name.equals("New Item");
//    }
    
    private static boolean isSulfuras(Item item) {
        return item.name.equals("Sulfuras, Hand of Ragnaros");
    }

    private static boolean isAgedBrie(Item item) {
        return item.name.equals("Aged Brie");
    }

    private static boolean isBackstagePass(Item item) {
        return item.name.equals("Backstage passes to a TAFKAL80ETC concert");
    }

    private static boolean isConjured(Item item) {
        return item.name.startsWith("Conjured");
    }
}
