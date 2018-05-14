const Discord = require("discord.js");
const klaw = require("klaw");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const path = require("path");
require("./modules/prototypes.js");

class Diamond extends Discord.Client {
  constructor(options) {
    super(options);
    this.config = require("./config.js");
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();
    this.ratelimits = new Discord.Collection();
  }
  
  loadCommand(cmdPath, name) {
    try {
      const cmd = new (require(`${cmdPath}${path.sep}${name}`))(this);
      this.commands.set(cmd.name, cmd);
      cmd.aliases.forEach(x => {
        this.aliases.set(x, cmd.name);
      });
      if(cmd.name.includes("-")) this.aliases.set(cmd.name.replace("-", ""), cmd.name);
    } catch(e) {
      console.error(e.stack);
    }
  }
}

client = new Diamond({
  disabledEvents: ["TYPING_START"],
  disableEveryone: true
});
require("./modules/functions.js")(client);

client
  .on("error", (err) => console.error(err))
  .on("warn", (w) => console.warn(w))
  .on("disconnect", () => console.warn("Bot disconnected"))
  .on("reconnecting", () => console.debug("Bot reconnecting..."));

(async() => {
  
  const commands = [];
  klaw("./commands")
    .on("data", (file) => {
      const cmd = path.parse(file.path);
      if(!cmd.ext || cmd.ext !== ".js") return; // ignore non js files.
      client.loadCommand(cmd.path, cmd.name);
      command.push(cmd.name);
    })
    .on("end", () => console.log(`Loaded a total of ${commands.length} commands!`))
    .on("error", (err) => console.error(err));
    
    const events = await readdir("./events");
    events.forEach(x => {
      if(x.endsWith(".js")) return; // ignore non js files.
      const ev = require(`./events/${x}`);
      if(typeof ev !== "function") return console.warn(`./events/${x} does not export a funtion, aborting load...`);
      const name = x.split(".")[0];
      client.on(name, ev.bind(null, client));
      delete require.cache[require.resolve(`./events/${x}`)];
    });
    
    if(!module.parent) {
      client.login(client.config.token);
    }
    
})();