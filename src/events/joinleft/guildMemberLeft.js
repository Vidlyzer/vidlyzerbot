const { EmbedBuilder } = require('discord.js');

module.exports = async (member) => {
    // Ganti 'YOUR_GOODBYE_CHANNEL_ID' dengan ID channel yang diinginkan
    const channel = member.guild.channels.cache.get('941665452931829830');
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setTitle("Selamat Tinggal!")
        .setDescription(`${member.displayName}, kami harap kamu dapat kembali ke server ${member.guild.name}. Terima kasih telah bergabung!`)
        .setColor(0xFF0000)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();

        channel.send({ embeds: [embed] })
        .then(() => console.log('Pesan selamat datang berhasil dikirim!'))
        .catch(error => console.error('Error sending welcome message:', error));;;
};