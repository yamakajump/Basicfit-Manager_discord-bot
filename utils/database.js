const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/dynamicChannels.json');

module.exports = {
    saveDynamicChannel(channelId) {
        let data;
        try {
            data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (err) {
            data = { channels: [] };
        }
        data.channels.push(channelId);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    },

    getDynamicChannel() {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return data.channels[0]; // Exemple : retourne le premier salon
        } catch (err) {
            return null;
        }
    },
};
