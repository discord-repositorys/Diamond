const config = require('./config.json');   
const ytdl = require('ytdl-core');
const request = require('request');
const getYouTubeID = require('get-youtube-id');
const Discord = require('discord.js');

let music = {};
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`All Set!`)
});

client.on('message', message => {
    
    let guild = music[message.guild.id];
        if (!guild) guild = music[message.guild.id] = {
            queue: [],
            skippers: [],
            skipReq: 0,
            isPlaying: false
    };
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        let song = args.join(' ')

        if (command === 'play') {
            if (!message.member.voiceChannel) return message.reply('Err...No voicechannel?');
            if (guild.isPlaying) {
               getID(song, id => {
                  if (!id) return message.reply('Unable to extract video.');
                  ytdl.getInfo(id, (err, info) => {
                     if (err) return message.reply('Hmm..there was an error extracting that video.');
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
            
        if (command === 'skip') {
            if (!guild || !guild.isPlaying || !message.guild.voiceConnection) return message.reply('No songs are in the queue. Welp.');
            if (!message.member.voiceChannel || message.member.voiceChannel.id !== message.guild.voiceConnection.channel.id) return message.reply('Eh, you need to be in the bot\'s voiceChannel to skip.');
            if (guild.skippers.includes(message.author.id)) return message.reply(' You\'ve already voted to skip!');
            guild.skippers.push(message.author.id)
              
            if (guild.skippers.length >= Math.floor(message.member.voiceChannel.members.size - 1) / 2) {
                skip_song(message);
                message.reply('Skipped');
             } else {
                    message.reply(` Your skip has been added. You need ${Math.ceil((msg.member.voiceChannel.members.size - 1) / 2) - guild_config.skippers.length} more votes to skip.`);
                }
              }

        if (command === 'queue') {
            if (!guild) return message.reply('No songs in queue.');
            message.channel.send(`\`\`\`Queue:\n${guild.queue.map(a => `**${a.info.title}** as requested by **${a.requester.user.username}**`).join('\n\n') || 'No songs currently queued!'}\`\`\``)
        }

        if (command === 'pause') {
            let voiceChannel = message.member.voiceChannel
            if (!voiceChannel || voiceChannel.id !== message.guild.voiceConnection.channel.id) return message.reply(`You must be in a voice channel to pause the music.`);
            try {
                message.guild.voiceConnection.dispatcher.pause();
                return message.reply(`Paused the song.`)
            } catch (err) {
                console.error(err)
                return message.reply(`Sorry, there was an error pausing the song.`)
            }
        }

            if (command === 'resume') {
            let voiceChannel = message.member.voiceChannel
            if (!voiceChannel || voiceChannel.id !== message.guild.voiceConnection.channel.id) return message.reply(`You must be in a voice channel to pause the music.`);
            try {
                message.guild.voiceConnection.dispatcher.resume();
               return message.reply('Successfully resumed playing.')
            } catch (err) {
                console.error(err)
                return message.reply('Sorry, there was an error resuming that song.')
            }
        }
    
    function getID(str, callback) {
        if(str.includes("youtube.com")){
            callback(getYouTubeID(str));
        } else {
            search_video(str, (id) => {
                callback(id);
            });
        }
    }

    function search_video(query, callback) {
        request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + config.yt_api_key, (error, response, body) => {
            if (error) return message.channel.send("There was an error finding the requested song.")
            try {
                const json = JSON.parse(body);
                callback(json.items[0].id.videoId);
            } catch (e) {
                callback(null);
            }
        });
    }

    function playMusic(guild, message) {
        const voiceChannel = message.member.voiceChannel;

        voiceChannel.join().then(connection => {
            guild.skippers = [];
            const stream = ytdl.downloadFromInfo(guild.queue[0].info, {
                filter: 'audioonly'
            });
            message.channel.send(`Now playing: **${guild.queue[0].info.title}** as requested by ${guild.queue[0].requester.displayName}`);

            const dispatcher = connection.playStream(stream);
            dispatcher.on('error', console.log);
            dispatcher.on('debug', console.log);
            dispatcher.on('end', () => {
                guild.queue.shift();
                if (guild.queue.length === 0) {
                    guild.isPlaying = false;
                    setTimeout(() => {
                        voiceChannel.leave();
                        return message.channel.send('Queue is empty. Queue up some more tunes!');
                    }, 2500);
                } else {
                    setTimeout(() => {
                        playMusic(guild, message);
                    }, 500);
                }
            });
        });
    }

    function skip_song(message) {
        message.guild.voiceConnection.dispatcher.end()
    }


})
client.login(config.token);