const fs = require('fs');

module.exports = (Discord, client) => {
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));

    for(const file of command_files){
        const command = require(`../commands/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
    client.user.id = '860552124064202812'
    let commands = client.commands.map(command => ({
        name: command.name, 
        description: command.description, 
        defaultPermission: command.defaultPermission}))
    client.application.commands.set(commands, process.env.DEV_GUILD_ID)
}