const Command = require("../../base/Command.js");

class Invite extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      description: "Invite Diamond to your guild.",
      usage: "invite",
      extended: "Invite Diamond with all nessecary permissions."
    });
  }
  
  run(message.args) {
    message.channel.send("Here ya go!")
        .then(msg => {
          msg.edit(`https://discordapp.com/api/oauth2/authorize?client_id=444297147580678164&permissions=473262295&scope=bot`)
        });
  }
}

module.exports = Ping;
