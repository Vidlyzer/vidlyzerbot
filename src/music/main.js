const { Client, Intents } = require('discord.js');
const { play } = require('./commands/play');
const { pause } = require('./commands/pause');
const { skip } = require('./commands/skip');
const { remove } = require('./commands/remove');
const { stop } = require('./commands/stop');
const { displayQueue } = require('./commands/queue');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '.';

client.once('ready', () => {
    console.log('Music bot is online!');
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        await play(args[0], args[1]);
    } else if (command === 'pause') {
        pause();
    } else if (command === 'skip') {
        skip();
    } else if (command === 'remove') {
        remove(parseInt(args[0], 10));
    } else if (command === 'stop') {
        stop();
    } else if (command === 'queue') {
        displayQueue();
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'play') {
        await play(options.getString('source'), options.getString('identifier'));
    } else if (commandName === 'pause') {
        pause();
    } else if (commandName === 'skip') {
        skip();
    } else if (commandName === 'remove') {
        remove(options.getInteger('index'));
    } else if (commandName === 'stop') {
        stop();
    } else if (commandName === 'queue') {
        displayQueue();
    }
});

client.login('YOUR_BOT_TOKEN'); // Ganti dengan token bot Anda

module.exports = { client };