const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const { play, search_video, playMusic, skip_song, getID } = require("../../utils/music.js")
const ytdl = require("ytdl-core");

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      description: " a song!",
      usage: "skip",
      category: "Music",
      extended: "Skip a song. Must be in a voice channel for this command to work.",
      aliases: ["s"]
    });
}

run(message, args) {
  if (!guild || !guild.isPlaying || !message.guild.voiceConnection) return message.reply('No songs are in the queue. Welp.');
            if (!message.member.voiceChannel || message.member.voiceChannel.id !== message.guild.voiceConnection.channel.id) return message.reply('Eh, you need to be in the bot\'s voiceChannel to skip.');
            if (guild.skippers.includes(message.author.id)) return message.reply(' You\'ve already voted to skip!');
            guild.skippers.push(message.author.id)
              
            if (guild.skippers.length >= Math.floor(message.member.voiceChannel.members.size - 1) / 2) {
                skip_song(message);
                message.reply('Skipped');
             } else {
                    message.reply(` Your skip has been added. You need ${Math.ceil((msg.member.voiceChannel.members.size - 1) / 2) - guild_config.skippers.length} more votes to skip.`);
                }
}
}
module.exports = Skip;
