module.exports = {
  data: {
    name: "Get Commands Info",
    tags: "Library Of Conflict",
  },
  category: "Bot",
  info: {
    source: "https://github.com/slothyace/BCS/tree/main/Mods/CustomLib",
    creator: "Conflict",
    donate: "https://ko-fi.com/slothyacedia",
  },
  UI: [
    {
      element: "storageInput",
      storeAs: "store",
      name: "Store Commands in List As",
    },
  ],

  subtitle: (data) => {
    return `List stored as ${data.store}`;
  },

  compatibility: ["Any"],

  async run(values, message, client, bridge) {

    const jsonData = require('../data.json');
    const commands = jsonData.commands;

    const commandList = [];


    commands.forEach(command => {
      if (command.trigger === 'textCommand') {
        commandList.push(command.name);
      }
    });

    bridge.store(values.commandList, commandList);
  }
};