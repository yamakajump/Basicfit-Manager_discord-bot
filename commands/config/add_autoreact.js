const path = require('path');
const fs = require('fs');
const { parseEmoji } = require('discord.js'); // Importer parseEmoji

const configPath = path.join(__dirname, '../../data/config.json');

function loadConfig() {
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

function saveConfig(data) {
    fs.writeFileSync(configPath, JSON.stringify(data, null, 4));
}

module.exports = {
    async execute(interaction) {
        const channel = interaction.options.getChannel('salon');
        const emoji = interaction.options.getString('emoji');

        // Vérifier si l'emoji est valide
        if (!isValidEmoji(emoji)) {
            return interaction.reply({
                content: `❌ L'emoji fourni n'est pas valide. Assurez-vous qu'il s'agit d'un emoji Unicode ou d'un emoji personnalisé Discord.`,
                ephemeral: true,
            });
        }

        const config = loadConfig();

        if (!config.autoReactChannels) {
            config.autoReactChannels = [];
        }

        // Ajouter le salon et l'emoji
        config.autoReactChannels.push({ channelId: channel.id, emoji });

        saveConfig(config);

        await interaction.reply({
            content: `✅ Auto-réaction configurée pour le salon <#${channel.id}> avec l'emoji ${emoji}.`,
            ephemeral: true,
        });
    },
};

// Fonction pour valider l'emoji
function isValidEmoji(emoji) {
    // Vérifie si c'est un emoji personnalisé
    const customEmoji = parseEmoji(emoji);
    if (customEmoji && customEmoji.id) {
        return true;
    }

    // Vérifie si c'est un emoji Unicode
    const unicodeRegex = /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]+$/u;
    if (unicodeRegex.test(emoji)) {
        return true;
    }

    return false;
}
