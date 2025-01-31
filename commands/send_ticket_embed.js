const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send_ticket_embed')
        .setDescription("Envoie un embed pour ouvrir un ticket (admin seulement).")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: "❌ Permission refusée.", ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('🎫 Système de Tickets')
            .setDescription('Sélectionnez le type de ticket que vous souhaitez ouvrir.')
            .setColor('#fb7819');

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(`ticket_select`)
            .setPlaceholder('🎟️ Sélectionnez un ticket')
            .addOptions([
                { label: 'Demande de rôles', value: `roles`, emoji: '📝', description: '@Coach, @Nutritionniste, @Influenceurs, @Équipe BasicFit' },
                { label: 'Signalement abus', value: `abus`, emoji: '⚠️', description: 'Signalez un utilisateur ou un problème' },
                { label: 'Problèmes bots', value: `bot`, emoji: '🤖', description: 'Signaler un problème avec les bots' },
                { label: 'Contacter staff', value: `staff`, emoji: '☎', description: 'Demander de l\'aide au staff' },
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};
