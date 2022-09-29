import Discord from "discord.js";

import loadGuildInfo from "../../../util/loadGuildInfo.js";

import type { ContextInteractionHandler } from "../../../types/InteractionHandler.js";

const handler: ContextInteractionHandler = async (client, interaction) => {
	if (!(interaction instanceof Discord.ContextMenuCommandInteraction)) {
		return;
	}

	console.log(
		`Context Menu Interaction Recieved - ${interaction.commandName} from ${interaction.user.tag} in ${interaction.guild?.name}`
	);
	if (!client.contexts.has(interaction.commandName) || !interaction.guild)
		return;

	const serverDoc = await loadGuildInfo(client, interaction.guild);

	try {
		await client.contexts
			.get(interaction.commandName)
			?.execute(client, interaction, serverDoc);
	} catch (e) {
		const embed = new Discord.EmbedBuilder()
			.setColor(0x000000)
			.setDescription("An error occured while processing your request");

		return interaction.editReply({ embeds: [embed] });
	}
};

export default handler;
