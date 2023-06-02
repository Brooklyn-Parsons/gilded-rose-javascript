import { expect, describe, it } from "vitest";
import { Item, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new Item("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });

  it("reduces quality by 2 for items with sellIn < 0", () => {
    const testItem = new Item("basic", -2, 8);
    items.push(testItem);

    updateQuality();

    expect(testItem.sellIn).toBe(-3);
    expect(testItem.quality).toBe(6);
  });

  it("does not reduce quality to a negative number", () => {
    const testItem = new Item("basic", 2, 0);

    updateQuality();

    expect(testItem.quality).toBe(0);
  });

  it("Increases quality if Aged Brie", () => {
    const testItem = new Item("Aged Brie", 3, 8);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(9);
  });

  it("Does not allow quality > 50", () => {
    const testItem = new Item("Aged Brie", 3, 50);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(50);
  });

  it("the 'Sulfuras, Hand of Ragnaros' never decreases in quality", () => {
    const testItem = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(80);
    expect(testItem.sellIn).toBe(0);
  });

  it("'Backstage passes to a TAFKAL80ETC concert' increases quality by 2 if sellIn <= 10", () => {
    const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(7);
    expect(testItem.sellIn).toBe(9);
  });

  it("'Backstage passes to a TAFKAL80ETC concert' increases quality by 3 if sellIn <= 5", () => {
    const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(8);
    expect(testItem.sellIn).toBe(4);
  });

  it("'Backstage passes to a TAFKAL80ETC concert' quality = 0 if sellIn < 0", () => {
    const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 15);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(-1);
  });
});