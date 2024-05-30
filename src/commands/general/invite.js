const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Vidlyzer Invite Link'),
    async execute(interaction) {
        await interaction.reply('https://discord.gg/vidlyzer');
    },
};
