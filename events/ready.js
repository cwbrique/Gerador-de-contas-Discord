const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true, 
    async execute(client) {
        console.log(`Logado Com Sucesso Na Aplicacao: ${client.user.tag}`.green);

        client.user.setPresence({
            activities: [{ name: `Generator System`, type: ActivityType.Streaming, url: "https://twitch.tv/discord" }],
            
          });

    }
};