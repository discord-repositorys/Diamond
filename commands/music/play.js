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
      if (song.match(/https:\/\/?www\.?youtube\.com\/watch\?v=(.*)/)) {
        try {
          const video = this.client.music.fromURL(song[2]);
          con.play(ytdl(video.url, { filter: "audioonly" }));
          message.channel.send(`Now playing from url: **${video.title}**`); 
        } catch (error) {
          return message.channel.send(`\`\`\`js\n${error.stack}\`\`\``);
        }
      } else if (song.match(/https:\/\/?(www\.)?youtu\.be\/(.*)/)) {
        try {
          const video = this.client.music.fromURL(song[2]);
          con.play(ytdl(video.url, { filter: "audioonly" }));
          message.channel.send(`Now playing from url: **${video.title}**`); 
        } catch (error) {
          return message.channel.send(`\`\`\`js\n${error.stack}\`\`\``);
        }
      } else {
        try {
          const videos = this.client.music.fromSearch(song);
          con.play(ytdl(videos[0].url, { filter: "audioonly" }));
          message.channel.send(`Now playing from search: **${videos[0].title}**`); 
        } catch (error) {
          return message.channel.send(`\`\`\`js\n${error.stack}\`\`\``);
        }
      }
    });
  }
}
module.exports = Play;
