const { getYoutubeStream, searchYoutube } = require('../youtube');
const { getSpotifyStream, searchSpotify, getSpotifyAccessToken } = require('../spotify');
const { queue } = require('./queue');

// Fungsi untuk memulai pemutaran musik
async function play(source, identifier) {
    let stream;
    if (source === 'youtube') {
        let url = identifier;
        if (!ytdl.validateURL(identifier)) {
            url = await searchYoutube(identifier);
        }
        stream = getYoutubeStream(url);
    } else if (source === 'spotify') {
        let trackId = identifier;
        const accessToken = await getSpotifyAccessToken();
        if (!/^[0-9a-zA-Z]{22}$/.test(identifier)) { // Cek apakah identifier bukan track ID
            trackId = await searchSpotify(identifier, accessToken);
        }
        stream = await getSpotifyStream(trackId);
    } else {
        throw new Error("Unsupported music source.");
    }

    // Tambahkan stream ke queue
    queue.add(stream);

    // Mulai pemutaran musik
    console.log("Playing music from", source);
}

module.exports = { play };