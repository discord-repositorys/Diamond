
const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const { play, search_video, playMusic, skip_song, getID } = require("../../utils/music.js")
const ytdl = require("ytdl-core");

class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Show the current queue.",
      usage: "queue",
      category: "Music",
      extended: "Show the music queue. You do not have to be in a music channel for this command to work."
    });
}

run(message, args) {
  let guild = music[message.guild.id];
        if (!guild) guild = music[message.guild.id] = {
            queue: [],
            skippers: [],
            skipReq: 0,
            isPlaying: false
    };
  if (!guild) return message.reply('No songs in queue.');
            message.channel.send(`\`\`\`Queue:\n${guild.queue.map(a => `**${a.info.title}** as requested by **${a.requester.user.username}**`).join('\n\n') || 'No songs currently queued!'}\`\`\``)
}
}
module.exports = Queue;
