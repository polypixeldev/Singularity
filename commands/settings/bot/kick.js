module.exports = (client, Discord, msg) => {
	const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setDescription('Are you sure you want to kick Singularity? (Y/N)');

		msg.channel.send({embeds: [embed]});
		msg.channel.awaitMessages(message => message.author.id === msg.author.id && (message.content === 'Y' || message.content === 'N'), {max: 1, time: 30000, errors: ['time']})
		.then(collection => {
			let message = collection.first();
			if(message.content === 'Y'){
				let currentDate = new Date(Date.now())
				
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setTitle('Goodbye')
				.setDescription(`
					I'm sorry that Singularity was not fit for your server. If possible, please fill out this survey:
					https://forms.gle/GgMKrsCHhe3fBN879

					In case you want to invite Singularity again, just use the following link:
					https://discord.com/oauth2/authorize?client_id=835256019336036423&scope=bot&permissions=8

					***Server data will be lost if Singularity is not re-invited within 5 minutes.***

					*Sincerely,
					The Singularity Team*
				`)
				.setFooter(`Singularity was kicked by ${msg.author.tag}  • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, msg.author.displayAvatarURL());

				msg.channel.send({embeds: [embed]}).then(() => {
					msg.guild.leave();

					setTimeout(async () => {
						if(await client.guilds.cache.find(guild => guild.id === msg.guild.id)){
							client.serverModel.deleteOne({guildID: msg.guild.id});
						}
					}, 300000);
				});
			} else {
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription('Kick Aborted');

				return msg.channel.send({embeds: [embed]});
			}
		})
		.catch(() => {
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('You did not respond with a valid answer in time!');

			return msg.channel.send({embeds: [embed]});
		})
}