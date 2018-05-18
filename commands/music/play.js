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
  if (!message.member.voiceChannel) return message.reply('Connect to a voice channel first.');
            if (guild.isPlaying) {
               getID(song, id => {
                  if (!id) return message.reply('Unable to extract video.');
                  ytdl.getInfo(id, (err, info) => {
                     if (err) return message.reply('Unable to extract video');
                     if (info.formats.some(format => format.live)) return message.reply('Not supporting live stream at this time.');
                     message.delete();
                        guild.queue.push({
                           info, requester: message.member
                     });
                     message.reply(`The song: **${info.title}** has been added to the queue list.`);
            
                  });
               });
            
            } else {
              guild.isPlaying = true;
               getID(song, id => {
               if (!id) return message.reply(' unable to extract video');
                  ytdl.getInfo(id, (err, info) => {
                  if (err) return message.reply('Hmm..there was an error extracting that video.');
                  if (info.formats.some(format => format.live)) return message.reply('Not supporting live stream at this time.');
                     message.delete();
                          guild.queue.push({
                           info, requester: message.member
                     });
                     playMusic(guild, message);
                  });
               });
             }
}
}
  
module.exports = Play;
