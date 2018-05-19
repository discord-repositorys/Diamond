const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const { play, search_video, playMusic, skip_song, getID } = require("../../utils/music.js")
const ytdl = require("ytdl-core");

class Resume extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      description: "Resume the paused song!",
      category: "Music",
      usage: "resume",
      extended: "Resume a song that Diamond is playing. Must be in the voice channel in order for this to work."
    });
  }
  
  run(message, args) {
    let voiceChannel = message.member.voiceChannel
            if (!voiceChannel || voiceChannel.id !== message.guild.voiceConnection.channel.id) return message.reply(`You must be in a voice channel to pause the music.`);
            try {
                message.guild.voiceConnection.dispatcher.resume();
               return message.reply('Successfully resumed playing.')
            } catch (err) {
                console.error(err)
                return message.reply('Sorry, there was an error resuming that song.')
            }
}
}


module.exports = Resume;
