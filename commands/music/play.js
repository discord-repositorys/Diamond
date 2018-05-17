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
  if(!song) return message.reply("Provide a youtube link to play!");
chan.join()
  .then(connection => {
  const dispatcher = connection.playStream(ytdl(song, { audioonly: true }));
  dispatcher.on("end", () => chan.leave());
}).catch(console.error);
}
}  
  
module.exports = Play;
