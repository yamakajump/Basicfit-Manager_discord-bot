const { loadJson } = require('../utils/fileManager');
const path = require('path');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        const configPath = path.join(__dirname, '../data/config.json');
        const config = loadJson(configPath);

        if (!config.autoReactChannels) return;

        // Vérifiez si le message est dans un salon d'auto-réaction
        const autoReact = config.autoReactChannels.find(
            item => item.channelId === message.channel.id
        );

        if (!autoReact) return;

        // Vérifier si le message contient un fichier ou un lien
        const hasAttachment = message.attachments.size > 0;
        const hasLink = /https?:\/\//.test(message.content);

        if (hasAttachment || hasLink) {
            try {
                // Ajouter une réaction au message
                await message.react(autoReact.emoji);
                console.log(`Réaction ${autoReact.emoji} ajoutée au message dans ${message.channel.name}`);
            } catch (error) {
                console.error(`Erreur lors de l'ajout de la réaction :`, error);
            }
        }
    },
};
