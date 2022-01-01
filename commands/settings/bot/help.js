const prefix = require("./prefix.js");
const nickname = require("../../nickname.js");
const kick = require("./kick.js");
module.exports = {
	name: "help",
	description: "Singularity Bot Settings",
	type: "mod",
	options: [],
	args: [],
	aliases: [],
	example: "settings bot",
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		if (interaction.options.getSubcommand(false) === "prefix") {
			prefix.slashExecute(client, Discord, interaction, serverDoc);
		} else if (interaction.options.getSubcommand(false) === "nickname") {
			nickname.slashExecute(client, Discord, interaction, serverDoc);
		} else if (interaction.options.getSubcommand(false) === "kick") {
			kick.slashExecute(client, Discord, interaction);
		} else {
			const embed = new client.utils.BaseEmbed(
				`Singularity Bot Settings - ${interaction.guild.name}`,
				interaction.user
			).setDescription(
				`
				**Change Prefix:** \`${serverDoc.prefix}settings bot prefix <prefix>\`
				 *- Current Setting:* \`${serverDoc.prefix}\`
				**Nickname Me:**  \`${serverDoc.prefix}settings bot nickname <nickname>\`
				 *- Current Setting:* \`${
						interaction.guild.members.resolve(client.user).nickname
							? interaction.guild.members.resolve(client.user).nickname
							: "None"
					}\`
				**Kick Me:** \`${serverDoc.prefix}settings bot kick\`
			`
			);

			return interaction.editReply({ embeds: [embed] });
		}
	},
};
