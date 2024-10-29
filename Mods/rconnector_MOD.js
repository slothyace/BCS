module.exports = {
  data: {
    name: "RCON Connect",
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
      element: "input",
      storeAs: "connectionLabel",
      name: "Connection Label",
      placeholder: "Try to use a unique connection label",
    },
    {
      element: "input",
      storeAs: "ipAddress",
      name: "RCON Server IP Address",
    },
    {
      element: "input",
      storeAs: "ipPort",
      name: "RCON Server Port",
    },
    {
      element: "input",
      storeAs: "rconPassword",
      name: "RCON Server Password",
    },
    "-",
    {
      element: "toggle",
      storeAs: "maintain",
      name: "Maintain Connection",
    },
    {
      element: "store",
      storeAs: "serverMessage",
      name: "Store RCON Server Message As",
    },
    {
      element: "actions",
      storeAs: "toRunAct",
      name: "Run actions"
    }
  ],

  subtitle: (values) => {
    return `${values.connectionLabel} | Connect to ${values.ipAddress}:${values.ipPort}, maintained: ${values.maintain}`
  },

  compatibility: ["Any"],

  async run(values, interaction, client, bridge){
    const Rcon = require("rcon")

    rconLb = bridge.transf(values.connectionLabel)
    ipAddr = bridge.transf(values.ipAddress)
    ipPort = bridge.transf(values.ipPort)
    rconPw = bridge.transf(values.rconPassword)

    const rconServer = new Rcon(ipAddr, ipPort, rconPw)

    rconServer.on("auth", function(){
      console.log(`Connection made with ${ipAddr}:${ipPort}, authentication success.`)
    }).on("error", function(err){
      console.log(`Connection with ${ipAddr}:${ipPort} failed. Probably a wrong password.` + err)
    }).on("end", function(){
      if (bridge.transf(values.maintain) == true){
        console.log(`Connection with ${ipAddr}:${ipPort} dropped, attempting reconnecting.`)
        rconServer.connect()
      }
    }).on("response", function (str) {
      console.log(str)
      bridge.store(values.serverMessage, str);
      bridge.runner(values.toRunAct);
    }).on("server", function (str) {
      console.log(str)
      bridge.store(values.serverMessage, str);
      bridge.runner(values.toRunAct);
    })
    
    try{
      rconServer.connect()
    }
    catch(error){
      console.log(`Error connecting with ${ipAddr}:${ipPort}`)
    }
  }
}