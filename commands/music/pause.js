const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const { play, search_video, playMusic, skip_song, getID } = require("../../utils/music.js")
const ytdl = require("ytdl-core");


class Pause extends Command {
  constructor(client) {
    super(client, {
      name: "pause",
      description: "Pause a song!",
      usage: "pause",
      category: "Music",
      extended: "Pause a song that Diamond is playing. Must be in the music channel in order for this to work",
      aliases: ["⏸"]
    });
  }
  
  
  run(message, args) {
       let voiceChannel = message.member.voiceChannel
            if (!voiceChannel || voiceChannel.id !== message.guild.voiceConnection.channel.id) return message.reply(`You must be in a voice channel to pause the music.`);
            try {
                message.guild.voiceConnection.dispatcher.pause();
                return message.reply(`Paused the song.`)
            } catch (err) {
                console.error(err)
                return message.reply(`Sorry, there was an error pausing the song.`)
            }
}
}

module.exports = Pause;
