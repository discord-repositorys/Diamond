const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const { play, search_video, playMusic, skip_song, getID } = require("../../utils/music.js")
const ytdl = require("ytdl-core");

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
  let music = {};
  let guild = music[message.guild.id];
        if (!guild) guild = music[message.guild.id] = {
            queue: [],
            skippers: [],
            skipReq: 0,
            isPlaying: false
    };
        const command = args.shift().toLowerCase();
        let song = args.join(' ')
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
