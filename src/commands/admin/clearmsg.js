const { SlashCommandBuilder, PermissionFlagsBits } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Membersihkan Chat')
        .addIntegerOption(option => 
            option.setName('jumlah_pesan')
                .setDescription('Jumlah pesan yang ingin dihapus')
                .setRequired(true)),
            
    async execute(interaction) {
        try {
            // Memeriksa apakah pengguna yang memanggil perintah memiliki peran admin
            if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                // Jika pengguna tidak memiliki peran admin, balas dengan pesan bahwa hanya admin yang dapat mengakses
                await interaction.reply('Hanya admin yang dapat mengakses perintah ini.');
                return;
            }

            // Mendapatkan jumlah pesan yang ingin dihapus dari opsi yang diinput oleh pengguna
            const jumlahPesan = interaction.options.getInteger('jumlah_pesan');

            // Memeriksa apakah jumlah pesan yang diinput valid (antara 1 dan 100)
            if (jumlahPesan <= 0 || jumlahPesan > 100) {
                await interaction.reply('Jumlah pesan yang ingin dihapus harus di antara 1 dan 100.');
                return;
            }

            // Menghapus pesan-pesan di channel tempat perintah dipanggil
            await interaction.channel.bulkDelete(jumlahPesan);

            // Memberi tahu pengguna bahwa pesan-pesan telah dihapus
            await interaction.reply({
                content: `Berhasil menghapus ${jumlahPesan} pesan.`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error responding to the interaction:', error);
            await interaction.reply('Terjadi kesalahan saat memproses permintaan ini.');
        }
    },
};
