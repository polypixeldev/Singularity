module.exports = {
	name: "reactionrole",
	description: "Instantiates a new reaction role",
	defaultPermission: true,
	options: [
		{
			name: "emoji",
			description: "The emoji users should react to receive the role",
			type: "STRING",
			required: true,
		},
		{
			name: "role",
			description: "The role users will receive when they react",
			type: "ROLE",
			required: true,
		},
		{
			name: "message",
			description: "The message I should send that users will react on",
			type: "STRING",
			required: true,
		},
	],
	type: "mod",
	args: ["<emoji>", "<role name>", "<message to send>"],
	aliases: ["rr"],
	example: "reactionrole ⏰ Notify React to get notified!",
	notes: "message will be sent in channel that the command is sent in",
	async execute(client, Discord, msg, args, serverDoc) {
		const reactionChannel = msg.channel;
		const emoji = args.shift();
		const roleName = args.shift();
		const messageSend = args.join(" ");

		const checkObj = {
			emoji: emoji,
			role_name: roleName,
			message_to_send: messageSend,
		};
		for (let field in checkObj) {
			if (!checkObj[field]) {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(`A required argument was not provided: \`${field}\``);
				return msg.channel.send({ embeds: [embed] });
			}
		}

		await msg.guild.roles.fetch();

		let roleCheck = await msg.guild.roles.cache.find(
			(role) => role.name === roleName
		);

		if (!roleCheck) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("That role does not exist!");

			return msg.channel.send({ embeds: [embed] });
		}

		let sentMessage;
		await reactionChannel.send({ content: messageSend }).then((sent) => {
			sentMessage = sent;
			serverDoc.reactionRoles.push([roleName, emoji, sent.id]);
			serverDoc.markModified("reactionRoles");
		});
		await client.utils.updateServer(client, serverDoc.guildID, {
			reactionRoles: serverDoc.reactionRoles,
		});
		sentMessage.react(emoji);
		const successEmbed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription("Reaction role added!");
		msg.channel.send({ embeds: [successEmbed] }).then((sent) => {
			setTimeout(() => {
				sent.delete();
			}, 3000);
		});
	},
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		const reactionChannel = interaction.channel;
		const emoji = interaction.options.get("emoji").value;
		const role = interaction.options.get("role").role;
		const messageSend = interaction.options.get("message").value;

		let sentMessage;
		await reactionChannel.send({ content: messageSend }).then((sent) => {
			sentMessage = sent;
			serverDoc.reactionRoles.push([role.name, emoji, sent.id]);
			serverDoc.markModified("reactionRoles");
		});
		await client.utils.updateServer(client, serverDoc.guildID, {
			reactionRoles: serverDoc.reactionRoles,
		});
		sentMessage.react(emoji);
		const successEmbed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription("Reaction role added!");
		interaction.editReply({ embeds: [successEmbed] });
	},
};
