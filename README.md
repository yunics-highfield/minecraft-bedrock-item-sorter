# Item Sorter for Minecraft Bedrock Edition

## Inventory Sort (Using Beta API)

**NOTE**: If you are unsure about the implications of using a beta version, it is recommended to avoid this addon.

Send "#s" in the chat to sort your inventory, excluding the hotbar.

Send "#cs" in the chat to toggle the Chest Sort feature. It is enabled by default. When enabled, interacting with a chest will automatically sort its contents.

You can see this description by sending "#item_sorter" in the chat.

## How to build the mcaddon.

1. Install Node.js
2. Open a console.
3. Go to this project's directory.
4. Run `npm ci` to prepare necessary modules.
5. Run `npm run mcaddon` to build the mcaddon.
6. Then you can see _./dist/packaes/item_sorter.mcaddon_.
