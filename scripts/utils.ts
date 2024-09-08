import { Container, ItemStack } from '@minecraft/server';
import { HOTBAR_SIZE, INVENTORY_SIZE } from './constants';

export function sortInventory(container: Container) {
  const items: ItemStack[] = [];
  const isPlayersInventory = container.size === HOTBAR_SIZE + INVENTORY_SIZE;
  const initialIndex = isPlayersInventory ? HOTBAR_SIZE : 0;
  for (let i = initialIndex; i < container.size; i++) {
    const item = container.getItem(i);
    if (item) items.push(item);
  }
  items.sort((a, b) => a.typeId.localeCompare(b.typeId));
  const sortedItems = items.reduce<ItemStack[]>((acc, item) => {
    if (acc.length < 1) {
      acc.push(item);
      return acc;
    }

    const prevItem = acc[acc.length - 1];
    if (item.isStackableWith(prevItem)) {
      if (item.amount + prevItem.amount <= prevItem.maxAmount) {
        prevItem.amount = item.amount + prevItem.amount;
      } else {
        item.amount = item.amount + prevItem.amount - prevItem.maxAmount;
        prevItem.amount = prevItem.maxAmount;
        acc.push(item);
      }
    } else {
      acc.push(item);
    }

    return acc;
  }, []);

  if (isPlayersInventory) {
    for (let i = 0; i < container.size; i++) {
      if (i < HOTBAR_SIZE) continue;
      const first = sortedItems.shift();
      container.setItem(i, first);
    }
  } else {
    container.clearAll();
    sortedItems.forEach((item) => container.addItem(item));
  }
}
