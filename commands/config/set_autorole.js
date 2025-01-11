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
        const role = interaction.options.getRole('role'); // Récupère le rôle spécifié par l'utilisateur

        // Charger la configuration actuelle
        const config = loadConfig();

        // Mettre à jour la configuration avec l'ID du rôle
        config.autoRoleId = role.id;

        // Sauvegarder la configuration mise à jour
        saveConfig(config);

        // Répondre à l'utilisateur pour confirmer
        await interaction.reply({
            content: `✅ Le rôle <@&${role.id}> sera désormais attribué automatiquement aux nouveaux membres.`,
            ephemeral: true,
        });
    },
};
