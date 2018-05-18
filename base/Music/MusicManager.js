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
     * Returns an Object that contains video info.
     * @param { string } id The video id that was retrieved when a url was matched.
     * @returns { Object }
     */
    async fromURL(urlMatch) {
        const video = await Yt.getVideoByID(url);
        if(!video) throw "NO_RESULTS";
        return video;
    }

    /**
     * Returns an Object Array that contains video info.
     * @param { string } search The video to search for.
     * @returns { Array<Object> }
     */
    async fromSearch(search) {
        const videos = await Yt.searchForVideos(search);
        if(!videos[0]) throw "NO_RESULTS";
        return videos;
    }

}