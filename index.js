const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`
#####{ Bot Ready! }#####
Users: ${client.user.tag}
Bot Id: ${client.user.id}
Servers: ${client.guilds.size}
Users: ${client.users.size}
########################`.trim());
  console.log("Diamond is in: " + client.guilds.size + " servers.");
  client.user.setActivity(`!! - In ${client.guilds.size} guilds!`);
});

client.on('message', msg => {
  if (!msg.content.startsWith('!!')) return;
  const args = msg.content.slice('!!'.length).split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'ping') {
    msg.channel.send(`Pong! My latency is: ${~~(client.ping)}ms`);
  }
  if(command === 'ban') {
    if (msg.channel.permissionsFor(client.user).has("EMBED_LINKS") && msg.channel.permissionsFor(client.user).has("BAN_MEMBERS")) {
        const user = msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0]);
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
            return msg.channel.send({embed: {
                color: 0x000000,
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.displayAvatarURL
                },
                title: ":x: You lack permission.",
                description: `${msg.author.tag} lacks the permissions to use the \`ban\` command`,
                timestamp: new Date(),
                footer: {
                    name: msg.author.displayAvatarURL,
                    text: `${msg.author.tag} tried to use the \`ban\` command.`
                }
            }
          });
        }
        if (!msg.channel.permissionsFor(client.user).has("EMBED_LINKS")) {
            return msg.channel.send({embed: {
                color: 0x00ff00,
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.displayAvatarURL
                },
                title: ":x: Diamond lacks the permissions.",
                description: "Please give Diamond the `Embed Links` permission.",
                timestamp: new Date(),
                footer: {
                    icon_url: msg.author.displayAvatarURL,
                    text: `Bot lacks permission.`
                }
            }
          });
        }
        if (!msg.channel.permissionsFor(client.user).has("BAN_MEMBERS")) {
            return msg.channel.send({embed: {
                color: 0x000000,
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.displayAvatarURL
                },
                title: ":x: Diamond lacks the permissions.",
                description: "Please give Diamond the `Ban Members` permission.",
                timestamp: new Date(),
                footer: {
                    icon_url: msg.author.displayAvatarURL,
                    text: `Bot lacks permission.`
                }
            }
          });
        }
        if (user.user.id === client.user) {
          return msg.channel.send({embed: {
              color: 0x000000,
              author: {
                  name: msg.author.tag,
                  icon_url: msg.author.displayAvatarURL
              },
              title: ":x: Cannot ban user!",
              description: "Diamond cannot ban itself",
              timestamp: new Date(),
              footer: {
                  icon_url: msg.author.displayAvatarURL,
                  text: `${msg.author.tag} failed to ban ${client.tag}.`
              }
            } 
          });
        }
        if (user.user.id === msg.author) {
          return msg.channel.send({embed: {
              color:0x000000,
              author: {
                  name: msg.author.tag,
                  icon_url: msg.author.displayAvatarURL
              },
              title: ":x: Cannot ban user!",
              description: "You cannot ban yourself.",
              timestamp: new Date(),
              footer: {
                  icon_url: msg.author.displayAvatarURL,
                  text: `${msg.author.tag} failed to ban ${user.user.tag}.`
              }
            } 
          });  
        }
        if (!user) {
            return msg.channel.send({embed: {
             color:0x00000,
             author: {
                 name : msg.author.tag,
                 icon_url: msg.author.displayAvatarURL
             },
             title: ":x: Cannot ban user!",
             description: "Diamond can not find the user in this server.",
             timestamp: new Date(),
             footer: {
                 icon_url: msg.author.displayAvatarURL,
                 text: `${client.tag} can not find the tagged user.`
             }   
            }
          });
        } else {
            const reason = args.join(" ").slice(args[0].length + 1);
            if (!reason) {
                return msg.channel.send({embed: {
                  color:0x000000,
                  author: {
                      name: msg.author.tag,
                      icon_url: msg.author.displayAvatarURL
                  },
                  title: ":x: Cannot ban user!",
                  description: "Please provide a reason for ban the user.",
                  timestamp: new Date(),
                  footer: {
                      icon_url: msg.author.displayAvatarURL,
                      text: `${msg.author.tag} failed to ban ${user.user.tag}`
                  }
                }
              });
            }
            user.kick(`${user.user.tag} was banned from ${client.guild}.`).then(() => {
                msg.channel.send({embed: {
                  color: 0x000000,
                  author: {
                      name: msg.author.tag,
                      icon_url: msg.author.displayAvatarURL
                  },
                  title: ":white_check_mark: Banned user!",
                  description: `${client.user} has banned ${user.user.tag}!`,
                  timestamp: new Date(),
                  footer: {
                      icon_url: msg.author.displayAvatarURL,
                      text: `${msg.author.tag} performed the action.`
                  }
                }
              });
              console.log(user);
            });
            
        } 
    }
  }             
    
  if(command === 'kick') {
      if (msg.channel.permissionsFor(client.user).has("EMBED_LINKS") && msg.channel.permissionsFor(client.user).has("KICK_MEMBERS")) {
          const user = msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0]);
          if (!msg.member.hasPermission("KICK_MEMBERS")) {
              return msg.channel.send({embed: {
                  color: 0x000000,
                  author: {
                      name: msg.author.tag,
                      icon_url: msg.author.displayAvatarURL
                  },
                  title: ":x: You lack permission.",
                  description: `${msg.author.tag} lacks the permissions to use the \`kick\` command`,
                  timestamp: new Date(),
                  footer: {
                      name: msg.author.displayAvatarURL,
                      text: `${msg.author.tag} tried to use the \`kick\` command.`
                  }
              }
            });
          }
          if (!msg.channel.permissionsFor(client.user).has("EMBED_LINKS")) {
              return msg.channel.send({embed: {
                  color: 0x00ff00,
                  author: {
                      name: msg.author.tag,
                      icon_url: msg.author.displayAvatarURL
                  },
                  title: ":x: Diamond lacks the permissions.",
                  description: "Please give Diamond the `Embed Links` permission.",
                  timestamp: new Date(),
                  footer: {
                      icon_url: msg.author.displayAvatarURL,
                      text: `Bot lacks permission.`
                  }
              }
            });
          }
          if (!msg.channel.permissionsFor(client.user).has("KICK_MEMBERS")) {
              return msg.channel.send({embed: {
                  color: 0x000000,
                  author: {
                      name: msg.author.tag,
                      icon_url: msg.author.displayAvatarURL
                  },
                  title: ":x: Diamond lacks the permissions.",
                  description: "Please give Diamond the `Kick Members` permission.",
                  timestamp: new Date(),
                  footer: {
                      icon_url: msg.author.displayAvatarURL,
                      text: `Bot lacks permission.`
                  }
              }
            });
          }
          if (user.user.id === client.user) {
            return msg.channel.send({embed: {
                color: 0x000000,
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.displayAvatarURL
                },
                title: ":x: Cannot kick user!",
                description: "Diamond cannot kick itself",
                timestamp: new Date(),
                footer: {
                    icon_url: msg.author.displayAvatarURL,
                    text: `${msg.author.tag} failed to kick ${client.tag}.`
                }
              } 
            });
          }
          if (user.user.equals(msg.author)) {
            return msg.channel.send({embed: {
                color:0x000000,
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.displayAvatarURL
                },
                title: ":x: Cannot kick user!",
                description: "You cannot kick yourself.",
                timestamp: new Date(),
                footer: {
                    icon_url: msg.author.displayAvatarURL,
                    text: `${msg.author.tag} failed to kick ${user.user.tag}.`
                }
              }
            });  
          }
          if (!user) {
              return msg.channel.send({embed: {
               color:0x00000,
               author: {
                   name : msg.author.tag,
                   icon_url: msg.author.displayAvatarURL
               },
               title: ":x: Cannot kick user!",
               description: "Diamond can not find the user in this server.",
               timestamp: new Date(),
               footer: {
                   icon_url: msg.author.displayAvatarURL,
                   text: `${client.tag} can not find the tagged user.`
               }   
              }
            });
          } else {
              const reason = args.join(" ").slice(args[0].length + 1);
              if (!reason) {
                  return msg.channel.send({embed: {
                    color:0x000000,
                    author: {
                        name: msg.author.tag,
                        icon_url: msg.author.displayAvatarURL
                    },
                    title: ":x: Cannot kick user!",
                    description: "Please provide a reason for kicking the user.",
                    timestamp: new Date(),
                    footer: {
                        icon_url: msg.author.displayAvatarURL,
                        text: `${msg.author.tag} failed to kick ${user.user.tag}`
                    }
                  }
                });
              }
              user.kick(`${user.user.tag} was kicked from ${client.guild}.`).then(() => {
                  msg.channel.send({embed: {
                    color: 0x000000,
                    author: {
                        name: msg.author.tag,
                        icon_url: msg.author.displayAvatarURL
                    },
                    title: ":white_check_mark: Kicked user!",
                    description: `${client.user} has kicked ${user.user.tag}!`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: msg.author.displayAvatarURL,
                        text: `${msg.author.tag} performed the action.`
                    }
                  }
                });
                console.log(user);
              });
              
          }
          

          }
      }
  
    if (command === 'avatar') {
        let user = msg.mentions.members.first() || msg.member;
        msg.channel.send(`${user.user.avatarURL} is ${user.mentions} avatar.`
    }
  if (command === 'help') {
      msg.channel.send(`
      \`\`\`
help ===== Shows this message
kick ===== Kicks a member from your server
ban ===== Bans a member from your server
avatar ===== Shows a user's avatar\`\`\`
      `)
  }
  //start here
});
  
client.login(process.env.TOKEN);
