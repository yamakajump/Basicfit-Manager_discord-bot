const path = require('path');
const fs = require('fs');

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

        const config = loadConfig();

        if (!config.autoReactChannels) {
            return interaction.reply({
                content: `❌ Aucun salon d'auto-réaction n'est configuré.`,
                ephemeral: true,
            });
        }

        // Supprimer le salon des auto-réactions
        config.autoReactChannels = config.autoReactChannels.filter(
            item => item.channelId !== channel.id
        );

        saveConfig(config);

        await interaction.reply({
            content: `✅ Auto-réaction supprimée pour le salon <#${channel.id}>.`,
            ephemeral: true,
        });
    },
};
