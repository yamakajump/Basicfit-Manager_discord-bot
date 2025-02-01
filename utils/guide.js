const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// 📖 Générer l'embed du guide selon la page
function getGuideEmbed(page, user) {
    const pages = {
        1: new EmbedBuilder()
            .setTitle('📖 Guide du Serveur BasicFit')
            .setDescription(
                "**Bienvenue sur le discord basicFit France !** 🏋️‍♂️\n\n" +
                "⚠️ **Ce serveur n'est pas affilié officiellement à Basic-Fit.**\n" +
                "C'est une communauté créée **par les membres, pour les membres**, pour partager notre passion du sport et du fitness !\n\n" +
                "**Que peux-tu faire ici ?**\n" +
                "✅ Discuter avec d'autres passionnés 💬\n" +
                "✅ Partager ta progression et tes performances 📸\n" +
                "✅ Poser tes questions sur l'entraînement et la nutrition ❓\n" +
                "✅ Trouver des conseils et programmes d'entraînement 💪\n\n" +
                "➡ **Utilise les boutons ci-dessous pour naviguer dans le guide !**"
            )
            .setColor('#fb7819'),

        2: new EmbedBuilder()
            .setTitle('🏢 Organisation du serveur')
            .setDescription("**Le serveur est organisé en 3 grandes catégories :**")
            .addFields(
                { name: '1️⃣ Communauté', value: 
                    "<#1326493776717287476> → Discussions générales\n" +
                    "<#1330933292647714827> → Partage tes **photos**\n" +
                    "<#1328750604872323163> → Montre tes **performances**\n" +
                    "<#1328743022854410321> → Partage ton **avant/après**\n" +
                    "<#1332059177060663378> → Playlist **motivation**"
                },
                { name: '2️⃣ Entraide', value: 
                    "<#1326674732980109354> → Pose tes **questions**\n" +
                    "<#1330556965205835820> → Partage des **conseils**\n" +
                    "<#1332428906799824928> → Trouve des **programmes**"
                },
                { name: '3️⃣ Nutrition', value: 
                    "<#1330554221812121651> → Pose tes **questions**\n" +
                    "<#1334628707477884938> → Guides **nutrition**\n" +
                    "<#1331582045813604424> → Parle des **compléments**\n" +
                    "<#1330557842658431098> → Partage tes **recettes**"
                }
            )
            .setColor('#fb7819'),

        3: new EmbedBuilder()
            .setTitle('🤝 Comment bien interagir avec la communauté ?')
            .setDescription(
                "**Quelques règles pour bien s’intégrer :**\n" +
                "✔️ **Respecte tout le monde** 💙\n" +
                "✔️ **Motivation et soutien** 💪\n" +
                "✔️ **Pas de spam ni de pub** 🚫\n" +
                "✔️ **Pose tes questions dans les bons salons** 📚\n" +
                "✔️ **Partage tes progrès** dans <#1330933292647714827>\n\n" +
                "**➡ Utilise les boutons ci-dessous pour continuer !**"
            )
            .setColor('#fb7819'),

        4: new EmbedBuilder()
            .setTitle('🎟️ Demander un rôle spécial')
            .setDescription(
                "**Certains membres peuvent obtenir des rôles spéciaux :**\n" +
                "- 🏋️‍♂️ **Coach** → Entraîneurs et experts\n" +
                "- 🍏 **Nutritionniste** → Spécialistes en diététique\n" +
                "- 🎥 **Influenceur** → Créateurs de contenu fitness\n" +
                "- 🔸 **Équipe BasicFit** → Employés BasicFit\n\n" +
                "**🎫 Ouvre un ticket pour demander un rôle !**"
            )
            .setColor('#fb7819'),

        5: new EmbedBuilder()
            .setTitle('🔥 Besoin d’aide ?')
            .setDescription(
                "🎫 **Ouvre un ticket si nécessaire**\n" +
                "👮‍♂️ **Mentionne un modérateur en cas de problème**\n\n" +
                "**Tu es maintenant prêt à profiter du serveur BasicFit Discord !**"
            )
            .setColor('#fb7819'),
    };

    return pages[page] || pages[1]; // Retour à la page 1 par défaut si la page demandée n'existe pas
}

// 🎮 Générer les boutons de navigation
function getGuideButtons(page, userId) {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`guide:previous:${page}:${userId}`)
            .setLabel('⬅ Précédent')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(page === 1),
        new ButtonBuilder()
            .setCustomId(`guide:next:${page}:${userId}`)
            .setLabel('➡ Suivant')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(page === 5),
        new ButtonBuilder()
            .setCustomId(`guide:home:${userId}`)
            .setLabel('🏠 Accueil')
            .setStyle(ButtonStyle.Success)
            .setDisabled(page === 1)
    );
}

module.exports = { getGuideEmbed, getGuideButtons };
