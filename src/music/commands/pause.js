const { queue } = require('./queue');

// Fungsi untuk menjeda pemutaran musik
function pause() {
    if (queue.currentStream) {
        queue.currentStream.pause();
        console.log("Music paused.");
    } else {
        console.log("No music is currently playing.");
    }
}

module.exports = { pause };