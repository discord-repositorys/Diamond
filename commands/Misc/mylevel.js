const Command = require("../../base/Command.js");

class MyLevel extends Command {
  constructor(client) {
    super(client, {
      name: "mylevel",
      description: "Displays your permission level for your location.",
      usage: "mylevel",
      extended: "Displays your level for the current channel. Rated 1 through 10."
    });
  }
  
  async run(message, args, level) {
    const friendly = this.client.config.permLevels.find(1 => 1.level === level).name;
    message.channel.send(`${this.client.responses.myLevelMessages.random().replaceAll("{{user}}", message.member.displayName).replaceAll("{{friendly}}", friendly.toLowerCase())}.`);
module.exports = Ping;
