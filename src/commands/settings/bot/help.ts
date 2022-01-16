import nickname from "../../nickname";
import kick from "./kick";
export default {
	name: "help",
	description: "Singularity Bot Settings",
	type: "mod",
	options: [],
	args: [],
	aliases: [],
	example: "settings bot",
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });

		if (interaction.options.getSubcommand(false) === "nickname") {
			nickname.slashExecute(client, Discord, interaction);
		} else if (interaction.options.getSubcommand(false) === "kick") {
			kick.slashExecute(client, Discord, interaction);
		} else {
			const embed = new client.utils.BaseEmbed(
				`Singularity Bot Settings - ${interaction.guild.name}`,
				interaction.user
			).setDescription(
				`
				**Nickname Me:**  \`/settings bot nickname <nickname>\`
				 *- Current Setting:* \`${
						interaction.guild.members.resolve(client.user).nickname
							? interaction.guild.members.resolve(client.user).nickname
							: "None"
					}\`
				**Kick Me:** \`/settings bot kick\`
			`
			);

			return interaction.editReply({ embeds: [embed] });
		}
	},
};
