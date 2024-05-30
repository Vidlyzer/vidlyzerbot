const axios = require('axios');
const querystring = require('querystring');

const clientId = '52e7b8c67ec3467bb534798f1be2c27c'; // Ganti dengan Client ID Anda
const clientSecret = '452fb38e6a1d4843bfc9e16c3820fa90'; // Ganti dengan Client Secret Anda

// Fungsi untuk mendapatkan token akses Spotify
async function getSpotifyAccessToken() {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = querystring.stringify({
        grant_type: 'client_credentials'
    });

    const headers = {
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await axios.post(tokenUrl, data, { headers });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
        throw error;
    }
}

// Fungsi untuk mendapatkan informasi trek dari Spotify
async function getTrackInfo(trackId, accessToken) {
    const url = `https://api.spotify.com/v1/tracks/${trackId}`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error('Error getting track info:', error);
        throw error;
    }
}

// Fungsi untuk mendapatkan stream Spotify (Placeholder)
async function getSpotifyStream(trackId) {
    try {
        const accessToken = await getSpotifyAccessToken();
        const trackInfo = await getTrackInfo(trackId, accessToken);
        // Implementasi untuk mendapatkan stream dari trackInfo
        console.log('Track Info:', trackInfo);
        throw new Error("Spotify streaming not implemented.");
    } catch (error) {
        console.error('Error getting Spotify stream:', error);
        throw error;
    }
}

module.exports = { getSpotifyStream };