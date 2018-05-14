const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      description: "Get someone's avatar!",
      usage: "avatar [@user]",
      category: "Misc",
      extended: "Returns avatar of someone or yours",
      aliases: ["pfp"]
    });
  }
  
  run(message, args) {
    const user = message.mentions.users.first() || message.author;
    const embed = new RichEmbed()
      .setTitle(`${user.tag}'s avatar`)
      .setImage(user.displayAvatarURL)
      .setFooter(`Requested by ${message.author.tag}`);
      
    message.channel.send({ embed });
  }
}

module.exports = Avatar;