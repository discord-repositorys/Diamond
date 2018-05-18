const Command = require("../../base/Command.js");
const ytdl = require("ytdl-core")
const { RichEmbed } = require("discord.js");

class Play extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      description: "Play a song!",
      usage: "play [song]",
      category: "Music",
      extended: "Play a song from YouTube.",
      aliases: ["p"]
    });
  }
  
  run(message, args) {
    const chan = message.member.voiceChannel;
    if(!chan) return message.reply("You need to be in a voice channel!");
    const song = args.join(" ");
    if(!song) return message.reply("Provide a youtube link to play or search!");
    chan.join().then(async con => {
      const res = await this.client.music.getVideos(song);
      if (!res[0]) {
        con.play(ytdl(song.url, { filter: "audioonly" }));
        message.channel.send(`Now playing: **${song.title}**`);
      } else {
        con.play(ytdl(song[0].url, { filter: "audioonly" }));
        message.channel.send(`Now playing: **${song[0].title}**`);
      }
    });
  }
}
module.exports = Play;
