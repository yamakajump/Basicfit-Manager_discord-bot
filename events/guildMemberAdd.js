const { loadJson } = require('../utils/fileManager');
const path = require('path');
const { getGuideEmbed, getGuideButtons } = require('../utils/guide'); // Importer les fonctions du guide

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        console.log(`Un nouveau membre a rejoint : ${member.user.tag}`);

        // Charger la configuration
        const configPath = path.join(__dirname, '../data/config.json');
        const config = loadJson(configPath);

        // Vérifier si un rôle automatique est configuré
        if (config.autoRoleId) {
            const role = member.guild.roles.cache.get(config.autoRoleId);
            if (role) {
                try {
                    await member.roles.add(role);
                    console.log(`Le rôle ${role.name} a été attribué à ${member.user.tag}`);
                } catch (error) {
                    console.error(`Erreur lors de l'attribution du rôle ${role.name} à ${member.user.tag} :`, error);
                }
            } else {
                console.error(`Le rôle avec l'ID ${config.autoRoleId} est introuvable.`);
            }
        }

        // 💬 Envoi du guide en DM (Page 1)
        try {
            const guideEmbed = getGuideEmbed(1, member.user);
            const row = getGuideButtons(1, member.user.id);

            await member.send({ embeds: [guideEmbed], components: [row] });
            console.log(`📖 Guide envoyé à ${member.user.tag} en DM.`);
        } catch (error) {
            console.error(`⚠️ Impossible d'envoyer le guide en DM à ${member.user.tag} :`, error);
        }
    },
};
