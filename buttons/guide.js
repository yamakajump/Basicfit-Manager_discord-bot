const { getGuideEmbed, getGuideButtons } = require('../utils/guide');

module.exports = {
    async execute(interaction, params) {
        // Extraire les paramètres du bouton
        const [action, page, memberId] = params;
        let currentPage = parseInt(page, 10);

        // Vérifier que l'utilisateur clique bien sur son propre guide
        if (interaction.user.id !== memberId) {
            return interaction.reply({ content: "❌ Ce guide ne vous est pas destiné.", ephemeral: true });
        }

        // Gérer l'action demandée
        let newPage;
        if (action === 'next') {
            newPage = currentPage + 1;
        } else if (action === 'previous') {
            newPage = currentPage - 1;
        } else if (action === 'home') {
            newPage = 1;
        } else {
            newPage = 1; // Valeur par défaut si l'action est invalide
        }

        // Vérifier que la page existe sinon revenir à la première page
        if (!getGuideEmbed(newPage, interaction.user)) {
            newPage = 1;
        }

        // Récupérer le nouvel embed et les boutons
        const guideEmbed = getGuideEmbed(newPage, interaction.user);
        const row = getGuideButtons(newPage, interaction.user.id);

        // Mettre à jour le message existant avec la nouvelle page
        await interaction.update({ embeds: [guideEmbed], components: [row] });
    },
};
