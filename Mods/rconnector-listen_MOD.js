module.exports = {
  data: {
    name: "RCON Listen",
  },
  category: "Game",
  info: {
    source: "https://github.com/slothyace/BCS/tree/main/Mods",
    creator: "Acedia",
    donate: "https://ko-fi.com/slothyacedia",
  },
  modules: ["rcon"],
  UI: [
    {
      element: "variable",
      storeAs: "connectionId",
      name: "Connection Details (from RCON Connect)"
    },
    {
      element: "store",
      storeAs: "serverMessage",
      name: "Store RCON Server Message As",
    },
    {
      element: "actions",
      storeAs: "toRunAct"
    }
  ],

  subtitle: (values) => {
    return `Store message from RCON server`
  },

  compatibity: ["Any"],

  async run(values, interaction, client, bridge){
    rconServer = client.rcon[bridge.transf(values.connectionId)]

    rconServer.on("server", function(str){
      bridge.store(values.serverMessage, str)
      bridge.runner(values.toRunAct)
    })
  }
}