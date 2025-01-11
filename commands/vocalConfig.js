client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'vocal-config') {
        const triggerChannel = interaction.options.getChannel('salon');
        if (triggerChannel.type !== 'GUILD_VOICE') {
            return interaction.reply({ content: "Veuillez spécifier un salon vocal.", ephemeral: true });
        }

        // Sauvegarde le salon dans une base de données ou un fichier JSON
        saveDynamicChannel(triggerChannel.id);

        interaction.reply(`Le salon vocal ${triggerChannel.name} a été configuré pour générer des salons dynamiques.`);
    }
});
