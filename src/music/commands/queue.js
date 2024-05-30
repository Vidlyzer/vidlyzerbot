const { EventEmitter } = require('events');

class MusicQueue extends EventEmitter {
    constructor() {
        super();
        this.queue = [];
        this.currentStream = null;
    }

    add(stream) {
        this.queue.push(stream);
        this.emit('added', stream);
    }

    // Placeholder untuk metode lain seperti play, skip, dll.
}

const queue = new MusicQueue();

function displayQueue() {
    if (queue.queue.length === 0) {
        console.log("The queue is empty.");
    } else {
        console.log("Current Queue:");
        queue.queue.forEach((item, index) => {
            console.log(`${index + 1}: ${item.title || 'Unknown Title'}`);
        });
    }
}

module.exports = { queue, displayQueue };