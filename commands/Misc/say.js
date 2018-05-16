const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

class Say extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      description: "Say something.",
      usage: "say [stuff]",
      catagory: "Misc",
      extended: "Say something. Will not make the bot say it. NOT.",
      cooldown: 3
    });
  }

  async run (message, args) { // eslint-disable-line no-unused-vars
      message.delete();
      const embed = new MessageEmbed()
          .setColor(15400990)
          .setDescription(`**${message.author.username}** says ` + (args.join(' ')))
      message.channel.send({embed})
  }
  
module.exports = Say;
