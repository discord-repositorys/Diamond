const MusicManager = require("../base/Music/MusicManager.js");

module.exports = (client) => {
  console.log(`
#####{ Bot Ready! }#####
Users: ${client.user.tag}
Bot Id: ${client.user.id}
Servers: ${client.guilds.size}
Users: ${client.users.size}
Channels: ${client.channels.size}
########################`.trim());
  console.log("Diamond is in: " + client.guilds.size + " servers.");
  client.user.setActivity(`!!help | ${client.guilds.size} guilds!`);
  client.music = new MusicManager(client);
};