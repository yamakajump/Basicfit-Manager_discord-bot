const { ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const ticketCategory = interaction.values[0]; 
        const user = interaction.user; 
        const guild = interaction.guild;

        try {
            // Vérifier si l'utilisateur a déjà un ticket ouvert
            const existingChannel = guild.channels.cache.find(c => c.name === `${ticketCategory}-${user.username}`);
            if (existingChannel) {
                return interaction.reply({ content: `❌ Vous avez déjà un ticket ouvert: ${existingChannel}.`, ephemeral: true });
            }

            // ID des catégories des tickets
            const categoryIds = {
                roles: '1327672751670169640',
                abus: '1335000474230980768',
                bot: '1335000531898335384',
                staff: '1335000582158549034',
            };

            const ticketCategoryId = categoryIds[ticketCategory] || categoryIds.staff;
            const staffRoleId = '1326544267346444289'; // Remplace avec l'ID du rôle staff

            // Créer un salon privé pour le ticket
            const ticketChannel = await guild.channels.create({
                name: `${ticketCategory}-${user.username}`,
                type: ChannelType.GuildText,
                parent: ticketCategoryId,
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: staffRoleId,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                ],
            });

            // Boutons pour gérer le ticket avec des émojis
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('close_ticket')
                    .setLabel('🔒 Fermer')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('reopen_ticket')
                    .setLabel('🔓 Réouvrir')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('delete_ticket')
                    .setLabel('🗑️ Supprimer')
                    .setStyle(ButtonStyle.Secondary)
            );

            // Définir un message d'accueil spécifique pour chaque type de ticket
            const ticketEmbeds = {
                roles: new EmbedBuilder()
                    .setTitle('📝 Demande de Rôles')
                    .setDescription(`Bonjour ${user}, merci d'indiquer quel rôle vous souhaitez obtenir.`)
                    .setColor('#fb7819'),
                abus: new EmbedBuilder()
                    .setTitle('⚠️ Signalement d\'Abus')
                    .setDescription(`Bonjour ${user}, décrivez le problème rencontré en détail.`)
                    .setColor('#fb7819'),
                bot: new EmbedBuilder()
                    .setTitle('🤖 Problèmes avec les Bots')
                    .setDescription(`Bonjour ${user}, expliquez le souci technique rencontré avec le bot.`)
                    .setColor('#fb7819'),
                staff: new EmbedBuilder()
                    .setTitle('☎ Contacter le Staff')
                    .setDescription(`Bonjour ${user}, comment pouvons-nous vous aider ?`)
                    .setColor('#fb7819'),
            };

            const embed = ticketEmbeds[ticketCategory] || ticketEmbeds.staff;
            await ticketChannel.send({ content: `${user}`, embeds: [embed], components: [row] });

            await interaction.reply({ content: `✅ Ticket créé: ${ticketChannel}.`, ephemeral: true });
        } catch (error) {
            console.error("Erreur lors de la création du ticket :", error);
            return interaction.reply({ content: "❌ Une erreur est survenue lors de la création du ticket.", ephemeral: true });
        }
    },
};
