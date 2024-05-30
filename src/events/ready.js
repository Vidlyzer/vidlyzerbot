const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    
    // Set status and activity
    client.user.setPresence({
      status: 'online', // Can be 'online', 'idle', 'dnd', or 'invisible'
      activities: [
        {
          name: 'discord.gg/vidlyzer', // The activity name
          type: ActivityType.Listening, // Can be 'PLAYING', 'STREAMING', 'LISTENING', 'WATCHING', 'COMPETING'
        },
      ],

    });

    console.log('Bot status and activity set successfully.');
  },
};
