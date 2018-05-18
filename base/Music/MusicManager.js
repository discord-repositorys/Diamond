const { StreamDispatcher, Client } = require("discord.js");
const YouTubeClient = require("yt-api").Client;
const Yt = new YouTubeClient(process.env.YT);

module.exports = class MusicManager extends Map {

    /**
     * A Custom implementation of music for the bot.
     * @extends { Map } Used as a list of MusicPlayers.
     * @param { Client } clientUser The Discord Client instance
     */
    constructor(clientUser) {
        super();
        /**
         * The Discord.JS Client used for music.
         */
        this.client = clientUser;
    }

    /**
     * Returns a promise containing A Single Object or an array of Objects.
     * @param { string } url The url of the video.
     * @returns { Promise<Object | Array<Object>> }
     */
    async getVideos(url) {
        if (url.match(/https:\/\/?(www\.)?youtube\.com\/watch\?v=(.*)/)) {
            Yt.getVideoByID(url[2])
                .then(v => { Promise.resolve(v); return; })
                .catch(() => { Promise.reject("NO_RESULTS"); return; });
        } else if (url.match(/https:\/\/?(www\.)?youtu\.be\/(.*)/)) {
            Yt.getVideoByID(url[2])
                .then(v => { Promise.resolve(v); return; })
                .catch(() => { Promise.reject("NO_RESULTS"); return; });
        } else {
            Yt.searchForVideos(url, 5)
                .then(async videos => {
                    const results = [];
                    for (let i = 0; i < videos.length; i++) {
                        const res = await Yt.getVideoByID(video.videoID);
                        results.push(res);
                    }
                    return Promise.resolve(results);
                }).catch(() => { Promise.reject("NO_RESULTS"); return; })
        }
    }

}