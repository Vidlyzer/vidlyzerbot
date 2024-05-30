const { EmbedBuilder } = require('discord.js');

module.exports = async (member) => {
    const channel = member.guild.channels.cache.get('941665452931829830');
    const cenelid = `782216432829202432`;

    if (!channel) return;

    const embed = new EmbedBuilder()
        .setTitle("Selamat Datang!")
        .setDescription(`Halo! ${member}, selamat datang di server ${member.guild.name}! Senang bisa bergabung. Jangan lupa cek <#${cenelid}> yaaa 😊!`)
        .setColor(0x00AE86)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: 'Username', value: `${member.user.username}`, inline: true },
            { name: 'Tanggal Join', value: `${member.joinedAt.toDateString()}`, inline: true },
            { name: 'Tanggal Pembuatan Akun', value: `${member.user.createdAt.toDateString()}`, inline: true },
            { name: 'Member Ke-', value: `${member.guild.memberCount}`, inline: true },
            { name: 'Bergabung Melalui', value: member.premiumSince ? 'Nitro Boost' : 'Link Invite', inline: true }
        );
        channel.send({ embeds: [embed] })
        .then(() => console.log('Pesan selamat datang berhasil dikirim!'))
        .catch(error => console.error('Error sending welcome message:', error));;
};