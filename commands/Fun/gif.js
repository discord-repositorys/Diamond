const Command = require("../../base/Command.js");
const Discord = require('discord.js');
const { RichEmbed } = require("discord.js");
const gifSearch = require("gif-search");

class Gif extends Command {
  constructor(client) {
    super(client, {
      name: "gif",
      description: "Generate a random gif",
      usage: "gif",
      catagory: "Fun",
      extended: "Generate a random gif at will. Weeb gifs come included.",
      aliases: ["giphy"],
      cooldown: 3
    });
  }
  
  run(msg, args) {
    gifSearch.random(args[0]).then(
      gifURL => {
      var embed = new RichEmbed()
        .setColor(`#b9f2ff`)
        .setImage(gifURL)
      msg.channel.send(embed);
   });
 }

module.exports = Gif;
