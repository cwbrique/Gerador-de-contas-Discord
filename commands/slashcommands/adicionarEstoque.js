
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder , ButtonStyle, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, PermissionFlagsBits  } = require('discord.js');
const wio = require("wio.db");
const config = require('../../config.json')
const services = new wio.JsonDatabase({ databasePath:"database/services.json" });
const free = new wio.JsonDatabase({ databasePath:"database/free.json" });
const booster = new wio.JsonDatabase({ databasePath:"database/booster.json" });
const fs = require('fs')
const request = require(`request`);
const randomnumber = Math.floor(Math.random() * 999)

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('adicionar')     
        .setDescription('Adiciona saldo ao usuario') 
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
               .addSubcommand(subcommand =>
                subcommand
                    .setName('estoque')
                    .setDescription('Adiciona estoque ao serviço') 
                    .addStringOption(option => option.setName('serviço').setDescription('Nome do serviço').setRequired(true))  
                    .addAttachmentOption(option => option.setName('combolist').setDescription('Combolist do seu estoque').setRequired(true))
                    .addStringOption(option => option.setName('tipo').setDescription('Tipo do serviço').setRequired(true).addChoices(
                      { name: 'Free', value: 'free' },
                      { name: 'Booster', value: 'booster' },
                      { name: 'Premium', value: 'premium' },
                  ))
                  ),

            async execute(interaction, client) {


                if (interaction.options.getSubcommand() === 'estoque') {
                  const choices = interaction.options.get('tipo').value;

                  if (choices === 'premium') {     
                    const produtos = services.all()
               
                    const serviço = interaction.options.getString('serviço');
                    const comblist = interaction.options.getAttachment('combolist');


                    if(!services.get(serviço)){
                        return interaction.reply({ content: '❌ Serviço não encontrado.', ephemeral: true })
                    }
                    
                    if(produtos.length < 1){
                     return interaction.reply({ content: '❌ Não há serviços cadastrados', ephemeral: true })
                    } else { 
                      await interaction.reply({ content: `Adicionando Estoque...`, ephemeral: true })
                  var stream = request(comblist).pipe(fs.createWriteStream(`combolist_${randomnumber}.txt`))
                  stream.on('finish', function () {

                    fs.readFile(`combolist_${randomnumber}.txt`, "utf-8", (err, data) => {
                        if (err) throw err;

                        let linhas = data.split("\n");

                       linhas.forEach(content => {
                            services.push(`${serviço}.estoque`, content.replace(/\r/g, ''));
                           
                          });

                          interaction.editReply({ content: `✅ Estoque adicionado com sucesso ao serviço **${serviço}**`, ephemeral: true })
                          .then((result)=>{
                            fs.unlinkSync(`combolist_${randomnumber}.txt`)
                                                          
                             })

                    })


                  })
                      
                 
            }
            } 

            if (choices === 'free') {     
              const produtos = free.all()
         
              const serviço = interaction.options.getString('serviço');
              const comblist = interaction.options.getAttachment('combolist');


              if(!free.get(serviço)){
                  return interaction.reply({ content: '❌ Serviço não encontrado.', ephemeral: true })
              }
              
              if(produtos.length < 1){
               return interaction.reply({ content: '❌ Não há serviços cadastrados', ephemeral: true })
              } else { 
                await interaction.reply({ content: `Adicionando Estoque...`, ephemeral: true })
            var stream = request(comblist).pipe(fs.createWriteStream(`combolist_${randomnumber}.txt`))
            stream.on('finish', function () {

              fs.readFile(`combolist_${randomnumber}.txt`, "utf-8", (err, data) => {
                  if (err) throw err;

                  let linhas = data.split("\n");

                 linhas.forEach(content => {
                      free.push(`${serviço}.estoque`, content.replace(/\r/g, ''));
                     
                    });

                    interaction.editReply({ content: `✅ Estoque adicionado com sucesso ao serviço **${serviço}**`, ephemeral: true })
                    .then((result)=>{
                      fs.unlinkSync(`combolist_${randomnumber}.txt`)
                                                    
                       })

              })


            })
                
           
      }
      } 

      if (choices === 'booster') {     
        const produtos = booster.all()
   
        const serviço = interaction.options.getString('serviço');
        const comblist = interaction.options.getAttachment('combolist');


        if(!booster.get(serviço)){
            return interaction.reply({ content: '❌ Serviço não encontrado.', ephemeral: true })
        }
        
        if(produtos.length < 1){
         return interaction.reply({ content: '❌ Não há serviços cadastrados', ephemeral: true })
        } else { 
          await interaction.reply({ content: `Adicionando Estoque...`, ephemeral: true })
      var stream = request(comblist).pipe(fs.createWriteStream(`combolist_${randomnumber}.txt`))
      stream.on('finish', function () {

        fs.readFile(`combolist_${randomnumber}.txt`, "utf-8", (err, data) => {
            if (err) throw err;

            let linhas = data.split("\n");

           linhas.forEach(content => {
            booster.push(`${serviço}.estoque`, content.replace(/\r/g, ''));
               
              });

              interaction.editReply({ content: `✅ Estoque adicionado com sucesso ao serviço **${serviço}**`, ephemeral: true })
              .then((result)=>{
                fs.unlinkSync(`combolist_${randomnumber}.txt`)
                                              
                 })

        })


      })
          
     
}
} 




          }
        
      }
}