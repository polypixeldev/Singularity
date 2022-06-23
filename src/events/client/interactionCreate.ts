import Discord from "discord.js";

import handleCommand from "./interactions/command.js";
import handleContextMenu from "./interactions/contextMenu.js";

import type Singularity from "../../interfaces/singularity.js";

export default (client: Singularity, interaction: Discord.Interaction) => {
	if (interaction.isCommand()) return handleCommand(client, interaction);
	if (interaction.isContextMenu())
		return handleContextMenu(client, interaction);
};
