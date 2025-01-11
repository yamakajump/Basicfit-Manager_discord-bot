const { loadJson } = require('../utils/fileManager');
const path = require('path');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        console.log(`Un nouveau membre a rejoint : ${member.user.tag}`);

        // Charger la configuration
        const configPath = path.join(__dirname, '../data/config.json');
        const config = loadJson(configPath);

        // Vérifier si un rôle automatique est configuré
        if (!config.autoRoleId) {
            console.log('Aucun rôle automatique configuré.');
            return;
        }

        // Récupérer le rôle à attribuer
        const role = member.guild.roles.cache.get(config.autoRoleId);

        if (!role) {
            console.error(`Le rôle avec l'ID ${config.autoRoleId} est introuvable.`);
            return;
        }

        try {
            // Attribuer le rôle au membre
            await member.roles.add(role);
            console.log(`Le rôle ${role.name} a été attribué à ${member.user.tag}`);
        } catch (error) {
            console.error(`Erreur lors de l'attribution du rôle ${role.name} à ${member.user.tag} :`, error);
        }
    },
};
