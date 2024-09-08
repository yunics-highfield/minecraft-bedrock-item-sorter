import { world, system, EntityInventoryComponent, BlockInventoryComponent } from '@minecraft/server';
import { MinecraftBlockTypes } from '@minecraft/vanilla-data';
import { COMMAND, HELP } from './constants';
import { sortInventory } from './utils';

let isEventsSubscribed = false;
let isChestSortEnabled = true;

function mainTick() {
  if (!isEventsSubscribed) {
    world.afterEvents.chatSend.subscribe((event) => {
      const message = event.message.trim();
      const sender = event.sender;
      const container = sender.getComponent(EntityInventoryComponent.componentId)?.container;
      switch (message) {
        case COMMAND.HELP:
        case `${COMMAND.HELP} -h`:
        case `${COMMAND.HELP} --help`: {
          world.sendMessage(HELP);
          break;
        }
        case COMMAND.SORT: {
          if (!container) return;
          sortInventory(container);
          world.sendMessage(`${sender.name}'s inventory has been sorted.`);
          break;
        }
        case COMMAND.CHEST_SORT: {
          isChestSortEnabled = !isChestSortEnabled;
          world.sendMessage(`The chest sort feature has been ${isChestSortEnabled ? 'enabled' : 'disabled'}.`);
          break;
        }
      }
    });

    world.afterEvents.playerInteractWithBlock.subscribe((event) => {
      switch (event.block.typeId) {
        case MinecraftBlockTypes.Chest:
        case MinecraftBlockTypes.EnderChest:
        case MinecraftBlockTypes.TrappedChest: {
          if (!isChestSortEnabled) break;

          const container = event.block.getComponent(BlockInventoryComponent.componentId)?.container;
          if (!container) break;
          sortInventory(container);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  isEventsSubscribed = true;

  system.run(mainTick);
}

system.run(mainTick);
