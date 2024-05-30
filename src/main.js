const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const commandHandler = require('./handler/cmdshandler');
const eventHandler = require('./handler/eventHandler');
const client = new Client({ intents: [3276799] });

// Load commands and events using handlers
commandHandler(client);
eventHandler(client);

//Experimental Hide
process.on('warning', (warning) => {
    if (warning.name === 'ExperimentalWarning') {
      // Mengabaikan peringatan eksperimental
    } else {
      console.warn(warning.name, warning.message);
    }
  });

client.login(token);
