import handleCommand from "./interactions/command";
import handleContextMenu from "./interactions/contextMenu";

export default (Discord, client, interaction) => {
	if (interaction.isCommand())
		return handleCommand(Discord, client, interaction);
	if (interaction.isContextMenu())
		return handleContextMenu(Discord, client, interaction);
};
