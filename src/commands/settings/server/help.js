import welcomeMessage from "./welcomemessage";
import leaveMessage from "./leavemessage";
export default {
	name: "help",
	description: "Singularity Server Settings",
	type: "ms",
	options: [],
	args: [],
	aliases: [],
	example: "settings server",
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		if (interaction.options.getSubcommand(false) === "welcomemessage") {
			welcomeMessage.slashExecute(client, Discord, interaction, serverDoc);
		} else if (interaction.options.getSubcommand(false) === "leavemessage") {
			leaveMessage.slashExecute(client, Discord, interaction, serverDoc);
		} else {
			const embed = new client.utils.BaseEmbed(
				`Singularity Server Settings - ${interaction.guild.name}`,
				interaction.user
			).setDescription(
				`
				**Set/Toggle a Welcome Message:** \`/settings server welcome <channel> <message>\`
				 *- Current Setting:* \`${serverDoc.welcomeMessage}\` *in* \`${
					interaction.guild.channels.resolve(serverDoc.welcomeChannelID)
						?.name ?? "None"
				}\`
				**Set/Toggle a Leave Message:** \`/settings server leave <channel> <message>\`
				 *- Current Setting:* \`${serverDoc.leaveMessage}\` *in* \`${
					interaction.guild.channels.resolve(serverDoc.leaveChannelID)?.name ??
					"None"
				}\`
			`
			);

			return interaction.editReply({ embeds: [embed] });
		}
	},
};
