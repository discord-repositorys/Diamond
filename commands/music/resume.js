const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const { play, search_video, playMusic, skip_song, getID } = require("../../utils/music.js")
const ytdl = require("ytdl-core");

class Resume extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      description: "Resume the paused song!",
      usage: "resume",
      extended: "Resume a song that Diamond is playing. Must be in the voice channel in order for this to work.",
    });
  }
