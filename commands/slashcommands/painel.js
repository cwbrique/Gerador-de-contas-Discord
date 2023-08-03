
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder , ButtonStyle, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, PermissionFlagsBits  } = require('discord.js');
const wio = require("wio.db");
const config = require('../../config.json')
const services = new wio.JsonDatabase({ databasePath:"database/services.json" });
const free = new wio.JsonDatabase({ databasePath:"database/free.json" });
const booster = new wio.JsonDatabase({ databasePath:"database/booster.json" });


module.exports =  {
	data: new SlashCommandBuilder()
		.setName('gerador')     
        .setDescription('Envia o painel de gerar contas') 
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => option.setName('tipo').setDescription('Tipo do painel').setRequired(true).addChoices(
            { name: 'Free', value: 'free' },
            { name: 'Booster', value: 'booster' },
            { name: 'Premium', value: 'premium' },
        )),

            async execute(interaction, client) {
                const choices = interaction.options.get('tipo').value;

                if (choices === 'premium') {     

               const serviços = services.all()

               if(serviços.length < 1){
                return interaction.reply({content: `❌ Nenhum serviço foi encontrado em meu sistema!`, ephemeral: true});
               }


               interaction.reply({content: `Enviando painel...`, ephemeral: true});
              
             
              const painel = new EmbedBuilder()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
              .setColor(config.embed_color)
              .setDescription(`Olá, Bem-Vindo(a) ao painel gerador de contas premium\nPara gerar uma conta você deve selecionar um serviço no menu abaixo!`)
              .setImage('https://media.discordapp.net/attachments/1059464660518195291/1074443590119473212/BANNER_GERADOR_PREMIUM.png')
              const rowMenu = new ActionRowBuilder()
              .addComponents(
                  new StringSelectMenuBuilder()
                      .setCustomId('painel_gerador')
                      .setPlaceholder('Selecione Um Serviço')
                      .addOptions(
                        serviços.map(serv => ( 
                              {
                                  label: serv.data.nome,
                                  value: serv.data.id,
                                  emoji: serv.data.emoji,
                                  description: `${serv.data.estoque.length} Em estoque`,
                              }
                        ))
                              ),
              );

              interaction.channel.send({embeds: [painel], components: [rowMenu]})
                            }


                            if (choices === 'free') {     

                                const serviços = free.all()
                 
                                if(serviços.length < 1){
                                 return interaction.reply({content: `❌ Nenhum serviço foi encontrado em meu sistema!`, ephemeral: true});
                                }
                 
                 
                                interaction.reply({content: `Enviando painel...`, ephemeral: true});
                               
                              
                               const painel = new EmbedBuilder()
                               .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                               .setColor(config.embed_color)
                               .setDescription(`Olá, Bem-Vindo(a) ao painel gerador de contas free\nPara gerar uma conta você deve selecionar um serviço no menu abaixo!`)
                               .setImage('https://media.discordapp.net/attachments/1059464660518195291/1074443607634878464/BANNER_GERADOR_FREE.png')
                               const rowMenu = new ActionRowBuilder()
                               .addComponents(
                                   new StringSelectMenuBuilder()
                                       .setCustomId('painel_free')
                                       .setPlaceholder('Selecione Um Serviço')
                                       .addOptions(
                                         serviços.map(serv => ( 
                                               {
                                                   label: serv.data.nome,
                                                   value: serv.data.id,
                                                   emoji: serv.data.emoji,
                                                   description: `${serv.data.estoque.length} Em estoque`,
                                               }
                                         ))
                                               ),
                               );
                 
                               interaction.channel.send({embeds: [painel], components: [rowMenu]})
                                             }

                                             if (choices === 'booster') {     

                                                const serviços = booster.all()
                                 
                                                if(serviços.length < 1){
                                                 return interaction.reply({content: `❌ Nenhum serviço foi encontrado em meu sistema!`, ephemeral: true});
                                                }
                                 
                                 
                                                interaction.reply({content: `Enviando painel...`, ephemeral: true});
                                               
                                              
                                               const painel = new EmbedBuilder()
                                               .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                                               .setColor(config.embed_color)
                                               .setDescription(`Olá, Bem-Vindo(a) ao painel gerador de contas boost\nPara gerar uma conta você deve selecionar um serviço no menu abaixo!`)
                                               .setImage('https://media.discordapp.net/attachments/1059464660518195291/1074443599376302132/BANNER_GERADOR_BOOST.png')
                                               const rowMenu = new ActionRowBuilder()
                                               .addComponents(
                                                   new StringSelectMenuBuilder()
                                                       .setCustomId('painel_booster')
                                                       .setPlaceholder('Selecione Um Serviço')
                                                       .addOptions(
                                                         serviços.map(serv => ( 
                                                               {
                                                                   label: serv.data.nome,
                                                                   value: serv.data.id,
                                                                   emoji: serv.data.emoji,
                                                                   description: `${serv.data.estoque.length} Em estoque`,
                                                               }
                                                         ))
                                                               ),
                                               );
                                 
                                               interaction.channel.send({embeds: [painel], components: [rowMenu]})
                                                             }                        
                        
                       
          }
      }
    