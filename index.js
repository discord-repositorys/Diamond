const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`
#####{ Bot Ready! }#####
Users: ${client.user.tag}
Bot Id: ${client.user.id}
Servers: ${client.guilds.size}
Users: ${client.users.size}
########################`.trim());
  console.log("Diamond is in: " + client.guilds.size + " servers.");
  client.user.setActivity(`!! - In ${client.guilds.size} guilds!`); 
 })
});

client.on('message', msg => {
  if (!msg.content.startsWith('!!')) return;
  const args = msg.content.slice('!!'.length).split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'ping') {
    msg.channel.send(`Pong! My latency is: ${~~(client.ping)}ms`);
  }
  
client.login(process.env.TOKEN);

  
  
