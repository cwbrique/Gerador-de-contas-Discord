const config = require('../config.json')
const { EmbedBuilder,AttachmentBuilder, ChannelType, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, ModalBuilder,TextInputBuilder, TextInputStyle, StringSelectMenuBuilder  } = require('discord.js')
const wio = require("wio.db");
const services = new wio.JsonDatabase({ databasePath:"database/services.json" });
const free = new wio.JsonDatabase({ databasePath:"database/free.json" });
const booster = new wio.JsonDatabase({ databasePath:"database/booster.json" });

const moment = require("moment");
moment.locale("pt-BR");
const cooldown = new Set();


module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

		if (!interaction.guild || interaction.user.bot) return;
		
		if (interaction.isCommand()) {

			const command = client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(interaction, interaction.client);
			} catch (error) {
				console.log(`${error}`);
				await interaction.reply(
					{
						content: 'An unexpected error occurred report in <#1015213311740100638>',
						ephemeral: true
					}
				);
			}
		}

		if(interaction.customId === 'painel_gerador'){
			const values = interaction.values
    const servi = services.all()

	servi.map(async ser => {

       if(values == ser.data.id){

		if (cooldown.has(interaction.user.id)) {
			const rowMenu = new ActionRowBuilder()
						  .addComponents(
							  new StringSelectMenuBuilder()
								  .setCustomId('painel_gerador')
								  .setPlaceholder('Selecione Um Serviço')
								  .addOptions(
									servi.map(serv => ( 
										  {
											  label: serv.data.nome,
											  value: serv.data.id,
											  emoji: serv.data.emoji,
											  description: `${serv.data.estoque.length} Em estoque`,
										  }
									))
										  ),
						  );
						  await interaction.deferUpdate(); 

			await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Espere 10 segundos para gerar um serviço novamente!`, ephemeral: true});	

		}

		if (!interaction.member.roles.cache.some(role => role.id === config.cargo_acesso_premium)) {
			
			
			const rowMenu = new ActionRowBuilder()
						  .addComponents(
							  new StringSelectMenuBuilder()
								  .setCustomId('painel_gerador')
								  .setPlaceholder('Selecione Um Serviço')
								  .addOptions(
									servi.map(serv => ( 
										  {
											  label: serv.data.nome,
											  value: serv.data.id,
											  emoji: serv.data.emoji,
											  description: `${serv.data.estoque.length} Em estoque`,
										  }
									))
										  ),
						  );
						  await interaction.deferUpdate(); 

			await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Você não tem permissão para usar o gerador premium, adquira o acesso em <#1063529305264619571>`, ephemeral: true});
		}

		if(!ser.data.estoque){
			
			
			const rowMenu = new ActionRowBuilder()
						  .addComponents(
							  new StringSelectMenuBuilder()
								  .setCustomId('painel_gerador')
								  .setPlaceholder('Selecione Um Serviço')
								  .addOptions(
									servi.map(serv => ( 
										  {
											  label: serv.data.nome,
											  value: serv.data.id,
											  emoji: serv.data.emoji,
											  description: `${serv.data.estoque.length} Em estoque`,
										  }
									))
										  ),
						  );
						  await interaction.deferUpdate(); 

			await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Este serviço não possui estoque!`, ephemeral: true});
		 }

         if(ser.data.estoque.length < 1){
	

const rowMenu = new ActionRowBuilder()
              .addComponents(
                  new StringSelectMenuBuilder()
                      .setCustomId('painel_gerador')
                      .setPlaceholder('Selecione Um Serviço')
                      .addOptions(
                        servi.map(serv => ( 
                              {
                                  label: serv.data.nome,
                                  value: serv.data.id,
                                  emoji: serv.data.emoji,
                                  description: `${serv.data.estoque.length} Em estoque`,
                              }
                        ))
                              ),
              );
			  await interaction.deferUpdate(); 

await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Este serviço não possui estoque!`, ephemeral: true});
		 }

	const a = services.get(`${ser.ID}.estoque`);
    const removed = a.splice(0, Number(1));

services.set(`${ser.ID}.estoque`, a)

const painel = new EmbedBuilder()
.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
.setColor(config.embed_color)
.setDescription(`${removed}`)
.setTimestamp()

await interaction.deferUpdate(); 



const rowMenu = new ActionRowBuilder()
              .addComponents(
                  new StringSelectMenuBuilder()
                      .setCustomId('painel_gerador')
                      .setPlaceholder('Selecione Um Serviço')
                      .addOptions(
                        servi.map(serv => ( 
                              {
                                  label: serv.data.nome,
                                  value: serv.data.id,
                                  emoji: serv.data.emoji,
                                  description: `${serv.data.estoque.length} Em estoque`,
                              }
                        ))
                              ),
              );

interaction.editReply({components: [rowMenu]})			  

interaction.followUp({embeds: [painel], ephemeral: true});

cooldown.add(interaction.user.id);
setTimeout(() => {                        
	cooldown.delete(interaction.user.id);
}, 10000);
	   }
	})
		
		}



		if(interaction.customId === 'painel_booster'){
			const values = interaction.values
    const servi = booster.all()

	servi.map(async ser => {

       if(values == ser.data.id){

		if (cooldown.has(interaction.user.id)) {
			const rowMenu = new ActionRowBuilder()
						  .addComponents(
							  new StringSelectMenuBuilder()
								  .setCustomId('painel_booster')
								  .setPlaceholder('Selecione Um Serviço')
								  .addOptions(
									servi.map(serv => ( 
										  {
											  label: serv.data.nome,
											  value: serv.data.id,
											  emoji: serv.data.emoji,
											  description: `${serv.data.estoque.length} Em estoque`,
										  }
									))
										  ),
						  );
						  await interaction.deferUpdate(); 

			await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Espere 10 segundos para gerar um serviço novamente!`, ephemeral: true});	

		}

		if (!interaction.member.roles.cache.some(role => role.id === config.cargo_acesso_booster)) {
			
			
			const rowMenu = new ActionRowBuilder()
						  .addComponents(
							  new StringSelectMenuBuilder()
								  .setCustomId('painel_booster')
								  .setPlaceholder('Selecione Um Serviço')
								  .addOptions(
									servi.map(serv => ( 
										  {
											  label: serv.data.nome,
											  value: serv.data.id,
											  emoji: serv.data.emoji,
											  description: `${serv.data.estoque.length} Em estoque`,
										  }
									))
										  ),
						  );
						  await interaction.deferUpdate(); 

			await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Você não tem permissão para usar o gerador boost, adquira o acesso impulsionando o servidor.`, ephemeral: true});
		}

		if(!ser.data.estoque){
			
			
			const rowMenu = new ActionRowBuilder()
						  .addComponents(
							  new StringSelectMenuBuilder()
								  .setCustomId('painel_booster')
								  .setPlaceholder('Selecione Um Serviço')
								  .addOptions(
									servi.map(serv => ( 
										  {
											  label: serv.data.nome,
											  value: serv.data.id,
											  emoji: serv.data.emoji,
											  description: `${serv.data.estoque.length} Em estoque`,
										  }
									))
										  ),
						  );
						  await interaction.deferUpdate(); 

			await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Este serviço não possui estoque!`, ephemeral: true});
		 }

         if(ser.data.estoque.length < 1){
	

const rowMenu = new ActionRowBuilder()
              .addComponents(
                  new StringSelectMenuBuilder()
                      .setCustomId('painel_booster')
                      .setPlaceholder('Selecione Um Serviço')
                      .addOptions(
                        servi.map(serv => ( 
                              {
                                  label: serv.data.nome,
                                  value: serv.data.id,
                                  emoji: serv.data.emoji,
                                  description: `${serv.data.estoque.length} Em estoque`,
                              }
                        ))
                              ),
              );
			  await interaction.deferUpdate(); 

await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Este serviço não possui estoque!`, ephemeral: true});
		 }

	const a = booster.get(`${ser.ID}.estoque`);
    const removed = a.splice(0, Number(1));

	booster.set(`${ser.ID}.estoque`, a)

const painel = new EmbedBuilder()
.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
.setColor(config.embed_color)
.setDescription(`${removed}`)
.setTimestamp()

await interaction.deferUpdate(); 



const rowMenu = new ActionRowBuilder()
              .addComponents(
                  new StringSelectMenuBuilder()
                      .setCustomId('painel_booster')
                      .setPlaceholder('Selecione Um Serviço')
                      .addOptions(
                        servi.map(serv => ( 
                              {
                                  label: serv.data.nome,
                                  value: serv.data.id,
                                  emoji: serv.data.emoji,
                                  description: `${serv.data.estoque.length} Em estoque`,
                              }
                        ))
                              ),
              );

interaction.editReply({components: [rowMenu]})			  

interaction.followUp({embeds: [painel], ephemeral: true});

cooldown.add(interaction.user.id);
setTimeout(() => {                        
	cooldown.delete(interaction.user.id);
}, 10000);
	   }
	})
		
		}

		if(interaction.customId === 'painel_free'){
			const values = interaction.values
    const servi = free.all()

	servi.map(async ser => {

       if(values == ser.data.id){

		if (cooldown.has(interaction.user.id)) {
			const rowMenu = new ActionRowBuilder()
						  .addComponents(
							  new StringSelectMenuBuilder()
								  .setCustomId('painel_free')
								  .setPlaceholder('Selecione Um Serviço')
								  .addOptions(
									servi.map(serv => ( 
										  {
											  label: serv.data.nome,
											  value: serv.data.id,
											  emoji: serv.data.emoji,
											  description: `${serv.data.estoque.length} Em estoque`,
										  }
									))
										  ),
						  );
						  await interaction.deferUpdate(); 

			await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Espere 10 segundos para gerar um serviço novamente!`, ephemeral: true});	

		}


		if(!ser.data.estoque){
			
			
			const rowMenu = new ActionRowBuilder()
						  .addComponents(
							  new StringSelectMenuBuilder()
								  .setCustomId('painel_free')
								  .setPlaceholder('Selecione Um Serviço')
								  .addOptions(
									servi.map(serv => ( 
										  {
											  label: serv.data.nome,
											  value: serv.data.id,
											  emoji: serv.data.emoji,
											  description: `${serv.data.estoque.length} Em estoque`,
										  }
									))
										  ),
						  );
						  await interaction.deferUpdate(); 

			await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Este serviço não possui estoque!`, ephemeral: true});
		 }

         if(ser.data.estoque.length < 1){
	

const rowMenu = new ActionRowBuilder()
              .addComponents(
                  new StringSelectMenuBuilder()
                      .setCustomId('painel_free')
                      .setPlaceholder('Selecione Um Serviço')
                      .addOptions(
                        servi.map(serv => ( 
                              {
                                  label: serv.data.nome,
                                  value: serv.data.id,
                                  emoji: serv.data.emoji,
                                  description: `${serv.data.estoque.length} Em estoque`,
                              }
                        ))
                              ),
              );
			  await interaction.deferUpdate(); 

await interaction.editReply({components: [rowMenu]})	
			return interaction.followUp({content: `❌ Este serviço não possui estoque!`, ephemeral: true});
		 }

	const a = free.get(`${ser.ID}.estoque`);
    const removed = a.splice(0, Number(1));

	free.set(`${ser.ID}.estoque`, a)

const painel = new EmbedBuilder()
.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
.setColor(config.embed_color)
.setDescription(`${removed}`)
.setTimestamp()

await interaction.deferUpdate(); 



const rowMenu = new ActionRowBuilder()
              .addComponents(
                  new StringSelectMenuBuilder()
                      .setCustomId('painel_free')
                      .setPlaceholder('Selecione Um Serviço')
                      .addOptions(
                        servi.map(serv => ( 
                              {
                                  label: serv.data.nome,
                                  value: serv.data.id,
                                  emoji: serv.data.emoji,
                                  description: `${serv.data.estoque.length} Em estoque`,
                              }
                        ))
                              ),
              );

interaction.editReply({components: [rowMenu]})			  

interaction.followUp({embeds: [painel], ephemeral: true});

cooldown.add(interaction.user.id);
setTimeout(() => {                        
	cooldown.delete(interaction.user.id);
}, 10000);
	   }
	})
		
		}
	




	


    }
}