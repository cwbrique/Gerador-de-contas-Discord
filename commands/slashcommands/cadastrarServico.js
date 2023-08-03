
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder , ButtonStyle, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, PermissionFlagsBits  } = require('discord.js');
const wio = require("wio.db");
const services = new wio.JsonDatabase({ databasePath:"database/services.json" });
const free = new wio.JsonDatabase({ databasePath:"database/free.json" });
const booster = new wio.JsonDatabase({ databasePath:"database/booster.json" });

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('cadastrar')     
        .setDescription('Cadastre um novo serviço para o gerador') 
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('serviço')
                .setDescription('Cadastre um novo serviço para o gerador') 
                .addStringOption(option => option.setName('nome').setDescription('Nome do serviço').setRequired(true))
                .addStringOption(option => option.setName('emoji').setDescription('Emoji do serviço').setRequired(true))   
                .addStringOption(option => option.setName('tipo').setDescription('Tipo do serviço').setRequired(true).addChoices(
                    { name: 'Free', value: 'free' },
                    { name: 'Booster', value: 'booster' },
                    { name: 'Premium', value: 'premium' },
                ))),           
               
            async execute(interaction, client) {
                const choices = interaction.options.get('tipo').value;

                const serviço = interaction.options.getString('nome');
                const emoji = interaction.options.getString('emoji');

                if (choices === 'premium') {   

                if(!services.get(serviço)){ 
                services.set(`${serviço}.emoji`, emoji);
                services.set(`${serviço}.nome`, serviço);
                services.set(`${serviço}.id`, serviço.replace(/ /g, '_'))
                services.set(`${serviço}.estoque`, [])
                interaction.reply({content: `✅ O serviço **${serviço}** foi cadastrado com sucesso!`, ephemeral: true});
                } else {
                    interaction.reply({content: `❌ O serviço **${serviço}** ja está cadastrado`, ephemeral: true})
                }
            }

            if (choices === 'free') {   
                if(!free.get(serviço)){ 
                    free.set(`${serviço}.emoji`, emoji);
                    free.set(`${serviço}.nome`, serviço);
                    free.set(`${serviço}.id`, serviço.replace(/ /g, '_'))
                    free.set(`${serviço}.estoque`, [])
                interaction.reply({content: `✅ O serviço **${serviço}** foi cadastrado com sucesso!`, ephemeral: true});
                } else {
                    interaction.reply({content: `❌ O serviço **${serviço}** ja está cadastrado`, ephemeral: true})
                }
            }


            if (choices === 'booster') {   
                if(!booster.get(serviço)){ 
                booster.set(`${serviço}.emoji`, emoji);
                booster.set(`${serviço}.nome`, serviço);
                booster.set(`${serviço}.id`, serviço.replace(/ /g, '_'))
                booster.set(`${serviço}.estoque`, [])
                interaction.reply({content: `✅ O serviço **${serviço}** foi cadastrado com sucesso!`, ephemeral: true});
                } else {
                    interaction.reply({content: `❌ O serviço **${serviço}** ja está cadastrado`, ephemeral: true})
                }
            }
               
      }
}