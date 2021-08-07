const handleCommand = require('./interactions/command.js')
module.exports = (Discord, client, interaction) => {
	if(interaction.isCommand()) return handleCommand(Discord, client, interaction);
}