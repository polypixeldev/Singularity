const handleCommand = require("./interactions/command.js");
const handleComponent = require("./interactions/handleComponent.js");
module.exports = (Discord, client, interaction) => {
  if (interaction.isCommand())
    return handleCommand(Discord, client, interaction);
  if (interaction.isMessageComponent())
    return handleComponent(Discord, client, interaction);
};
