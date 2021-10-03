module.exports = {
	name: "say",
	description: "The bot says the message you pass in",
	defaultPermission: true,
	options: [
		{
			name: "message",
			description: "The message I should repeat",
			type: "STRING",
			required: true,
		},
	],
	type: "general",
	args: ["<message to repeat"],
	aliases: [],
	example: "say I am Singularity",
	execute(client, Discord, msg, args) {
		if (args.length === 0) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("Please enter a message for me to say!");

			return msg.channel.send({ embeds: [embed] });
		}
		if (msg.author.id === "722092754510807133" && msg.content.startsWith("~")) {
			msg.channel.send(`${args.join(" ")}`).then(() => {
				msg.delete();
			});
		} else {
			msg.channel.send(`**${msg.author.tag}:** ${args.join(" ")}`).then(() => {
				msg.delete();
			});
		}
	},
	slashExecute(client, Discord, interaction) {
		if (
			interaction.user.id === "722092754510807133" &&
			interaction.options.get("message").value.startsWith("~")
		) {
			interaction.channel.send(
				`${interaction.options.get("message").value.slice(1)}`
			);
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("Done!");

			interaction.reply({ embeds: [embed], ephemeral: true });
		} else {
			interaction.reply({
				content: `**${interaction.user.tag}:** ${
					interaction.options.get("message").value
				}`,
				allowedMentions: {
					parse: ["everyone", "roles", "users"],
					users: [],
					roles: [],
				},
			});
		}
	},
};
