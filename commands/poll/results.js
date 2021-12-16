const optMapping = {
	1: "1️⃣",
	2: "2️⃣",
	3: "3️⃣",
	4: "4️⃣",
	5: "5️⃣",
	6: "6️⃣",
	7: "7️⃣",
	8: "8️⃣",
	9: "9️⃣",
	10: "🔟",
};

module.exports = {
	name: "results",
	description: "Shows the results of a poll",
	options: [
		{
			name: "id",
			description: "The poll ID of the poll",
			type: "STRING",
			required: true,
		},
	],
	example: "poll results",
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });

		let fetches = [];
		for (let channel of interaction.guild.channels.cache) {
			channel = channel[1];
			if (!channel.messages) continue;
			fetches.push(channel.messages.fetch(interaction.options.get("id").value));
		}

		let pollMessage = await Promise.any(fetches);

		const invalidPoll = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription("The specified poll does not exist!");

		if (!pollMessage) return interaction.editReply({ embeds: [invalidPoll] });
		let embed = pollMessage.embeds[0];
		if (!embed) return interaction.editReply({ embeds: [invalidPoll] });
		let options = [];
		let data = [];
		let optStr = embed.fields.find((field) => field.name === "Options").value;

		options = optStr
			.split("\n")
			.filter((opt) => opt !== " ")
			.map((opt) => opt.slice(4));
		for (let i = 0; i < options.length; i++) {
			data.push(
				pollMessage.reactions.cache.get(optMapping[`${i + 1}`]).count - 1
			);
		}

		const results = new client.utils.BaseEmbed(
			"Poll Results",
			interaction.user
		).setDescription(`Results for poll \`${embed.title}\``);

		for (let i = 0; i < options.length; i++) {
			results.addField(options[i], `**${data[i]}** vote(s)`, true);
		}

		interaction.editReply({ embeds: [results] });
	},
};
