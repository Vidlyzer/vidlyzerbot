const ytdl = require('ytdl-core');
const axios = require('axios');

const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Ganti dengan API Key YouTube Anda

// Fungsi untuk mencari video YouTube berdasarkan keyword
async function searchYoutube(keyword) {
    const searchUrl = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
        part: 'snippet',
        q: keyword,
        type: 'video',
        maxResults: 1,
        key: apiKey
    };

    try {
        const response = await axios.get(searchUrl, { params });
        const video = response.data.items[0];
        if (video) {
            return `https://www.youtube.com/watch?v=${video.id.videoId}`;
        } else {
            throw new Error('No video found for the given keyword.');
        }
    } catch (error) {
        console.error('Error searching YouTube:', error);
        throw error;
    }
}

// Fungsi untuk mendapatkan stream YouTube
function getYoutubeStream(url) {
    if (!ytdl.validateURL(url)) {
        throw new Error("Invalid YouTube URL.");
    }
    return ytdl(url, { filter: 'audioonly' });
}

module.exports = { getYoutubeStream, searchYoutube };