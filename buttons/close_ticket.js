const { PermissionsBitField } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const channel = interaction.channel;

        if (!channel) {
            return interaction.reply({ content: "❌ Impossible de trouver le salon.", ephemeral: true });
        }

        // Vérifie si l'utilisateur a la permission de fermer le ticket
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: "❌ Vous n'avez pas la permission de fermer ce ticket.", ephemeral: true });
        }

        // Récupérer toutes les permissions du salon
        const permissionOverwrites = channel.permissionOverwrites.cache;

        // Modifier les permissions de tous les membres ayant accès au ticket sauf le staff
        permissionOverwrites.forEach(async (overwrite) => {
            if (overwrite.type === 1 && overwrite.id !== interaction.guild.id) { // Type 1 = utilisateur, exclure le serveur
                await channel.permissionOverwrites.edit(overwrite.id, {
                    ViewChannel: false
                });
            }
        });

        await interaction.reply({ content: "🔒 Ce ticket a été fermé. Seul le staff peut encore voir ce salon.", ephemeral: false });
    },
};
