client.on('voiceStateUpdate', async (oldState, newState) => {
    const triggerChannelId = getDynamicChannel(); // Récupère l'ID configuré

    if (newState.channelId === triggerChannelId) {
        const guild = newState.guild;

        const dynamicChannel = await guild.channels.create(`Salon de ${newState.member.displayName}`, {
            type: 'GUILD_VOICE',
            parent: newState.channel.parent, // Même catégorie
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: ['CONNECT'],
                },
                {
                    id: newState.member.id,
                    allow: ['MANAGE_CHANNELS', 'CONNECT'],
                },
            ],
        });

        // Déplace l'utilisateur dans le salon créé
        newState.setChannel(dynamicChannel);
    }
});
