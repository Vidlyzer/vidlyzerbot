const { queue } = require('./queue');

// Fungsi untuk melewati pemutaran musik
function skip() {
    if (queue.currentStream) {
        queue.currentStream.end();
        console.log("Music skipped.");
    } else {
        console.log("No music is currently playing.");
    }
}

module.exports = { skip };