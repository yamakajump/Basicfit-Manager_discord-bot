const { PermissionsBitField } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const channel = interaction.channel;

        if (!channel) {
            return interaction.reply({ content: "❌ Impossible de trouver le salon.", ephemeral: true });
        }

        // Vérifie si l'utilisateur a la permission de supprimer le ticket
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: "❌ Vous n'avez pas la permission de supprimer ce ticket.", ephemeral: true });
        }

        await interaction.reply({ content: "🗑️ Ce ticket sera supprimé dans 5 secondes...", ephemeral: false });

        setTimeout(() => {
            channel.delete().catch(console.error);
        }, 5000);
    },
};
