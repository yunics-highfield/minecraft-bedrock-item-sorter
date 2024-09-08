export const HOTBAR_SIZE = 9;
export const INVENTORY_SIZE = 27;

export const COMMAND = {
  HELP: '#item_sorter',
  SORT: '#s',
  CHEST_SORT: '#cs',
};

export const HELP = `[Commands]
${COMMAND.SORT}:
  Sort your inventory, excluding the hotbar.

${COMMAND.CHEST_SORT}:
  Toggle the Chest Sort feature. It is enabled by default. When enabled, interacting with a chest will automatically sort its contents.
`;
