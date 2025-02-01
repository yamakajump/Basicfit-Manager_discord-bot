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

            // 🎟️ Embed générique pour la gestion du ticket
            const ticketManagementEmbed = new EmbedBuilder()
                .setTitle('🎟️ Gestion du Ticket')
                .setDescription(`Utilisez les boutons ci-dessous pour gérer ce ticket.\n\n🔒 **Fermer** : Rend le ticket invisible sauf pour le staff.\n🔓 **Réouvrir** : Rétablit l'accès pour le demandeur.\n🗑️ **Supprimer** : Supprime définitivement le ticket.`)
                .setColor('#fb7819');

            // 📌 Embed d'instructions spécifiques selon la catégorie
            const ticketInstructionsEmbeds = {
                roles: new EmbedBuilder()
                    .setTitle('📝 Demande de Rôles')
                    .setDescription(`Bonjour ${user}, merci d'indiquer quel rôle vous souhaitez obtenir (ex: @Coach, @Nutritionniste, etc.). Un membre du staff vous répondra rapidement.`)
                    .setColor('#fb7819'),
                abus: new EmbedBuilder()
                    .setTitle('⚠️ Signalement d\'Abus')
                    .setDescription(`Bonjour ${user}, merci de donner **un maximum de détails** sur la situation et d'inclure des preuves (captures d’écran, liens, etc.) si possible.`)
                    .setColor('#fb7819'),
                bot: new EmbedBuilder()
                    .setTitle('🤖 Problèmes avec les Bots')
                    .setDescription(`Bonjour ${user}, veuillez décrire **le problème que vous avez rencontré avec le bot**. Ajoutez si possible des messages d’erreur ou des captures d’écran.`)
                    .setColor('#fb7819'),
                staff: new EmbedBuilder()
                    .setTitle('☎ Contacter le Staff')
                    .setDescription(`Bonjour ${user}, indiquez clairement **la raison de votre demande** afin que l’équipe puisse vous aider efficacement.`)
                    .setColor('#fb7819'),
            };

            const instructionEmbed = ticketInstructionsEmbeds[ticketCategory] || ticketInstructionsEmbeds.staff;

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

            // ✅ Envoyer l'embed de gestion avec les boutons et attendre son envoi
            const ticketMessage = await ticketChannel.send({ embeds: [ticketManagementEmbed], components: [row] });

            // ✅ Épingler le message dès qu'il est envoyé avec gestion d'erreur
            try {
                await ticketMessage.pin();
            } catch (error) {
                console.error("❌ Erreur lors de l'épinglage du message :", error);
            }

            // Envoyer l'embed d'instructions
            await ticketChannel.send({ content: `${user}`, embeds: [instructionEmbed] });

            await interaction.reply({ content: `✅ Ticket créé: ${ticketChannel}.`, ephemeral: true });
        } catch (error) {
            console.error("Erreur lors de la création du ticket :", error);
            return interaction.reply({ content: "❌ Une erreur est survenue lors de la création du ticket.", ephemeral: true });
        }
    },
};
