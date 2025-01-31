const { PermissionsBitField } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const channel = interaction.channel;

        if (!channel) {
            return interaction.reply({ content: "❌ Impossible de trouver le salon.", ephemeral: true });
        }

        // Vérifie si l'utilisateur a la permission de rouvrir le ticket
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: "❌ Vous n'avez pas la permission de rouvrir ce ticket.", ephemeral: true });
        }

        // Récupérer toutes les permissions du salon
        const permissionOverwrites = channel.permissionOverwrites.cache;

        // Modifier les permissions de tous les membres qui avaient accès avant
        permissionOverwrites.forEach(async (overwrite) => {
            if (overwrite.type === 1 && overwrite.id !== interaction.guild.id) { // Type 1 = utilisateur
                await channel.permissionOverwrites.edit(overwrite.id, {
                    ViewChannel: true
                });
            }
        });

        await interaction.reply({ content: "🔓 Ce ticket a été rouvert. Les membres peuvent maintenant voir le salon.", ephemeral: false });
    },
};
