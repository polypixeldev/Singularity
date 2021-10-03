const handleCommand = require("./interactions/command.js");
const handleComponent = require("./interactions/component.js");
const handleContextMenu = require("./interactions/contextMenu.js");
module.exports = (Discord, client, interaction) => {
	if (interaction.isCommand())
		return handleCommand(Discord, client, interaction);
	if (interaction.isMessageComponent())
		return handleComponent(Discord, client, interaction);
	if (interaction.isContextMenu())
		return handleContextMenu(Discord, client, interaction);
};
