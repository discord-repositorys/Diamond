

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
        request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + process.env.YT, (error, response, body) => {
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

module.exports.getID = getID;
module.exports.search_video = search_video;
module.exports.playMusic = playMusic;
module.exports.skip_song = skip_song;