import Discord from "discord.js";

import handleCommand from "./interactions/command";
import handleContextMenu from "./interactions/contextMenu";

import Singularity from "../../interfaces/singularity";

export default (client: Singularity, interaction: Discord.Interaction) => {
	if (interaction.isCommand()) return handleCommand(client, interaction);
	if (interaction.isContextMenu())
		return handleContextMenu(client, interaction);
};
