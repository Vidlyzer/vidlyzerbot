const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');

module.exports = (client) => {
  client.commands = new Map();

  const commands = [];

  const loadCommands = (commandsPath) => {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    console.log(`Loading commands from: ${commandsPath}`); // Debug log

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
      console.log(`Loaded command: ${command.data.name}`); // Debug log
    }
  };

  // Load general commands
  const generalCommandsPath = path.join(__dirname, '../commands/general');
  loadCommands(generalCommandsPath);
  console.log('General commands loaded successfully.');

  // Load admin commands
  const adminCommandsPath = path.join(__dirname, '../commands/admin');
  loadCommands(adminCommandsPath);
  console.log('Admin commands loaded successfully.');

  // Load music commands
  //const musicCommandsPath = path.join(__dirname, '../music/commands');
  //loadCommands(musicCommandsPath);
  //console.log('Music commands loaded successfully.');

  // Register commands using REST API
  const rest = new REST({ version: '10' }).setToken(token);

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );


      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();
};
