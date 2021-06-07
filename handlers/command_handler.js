const fs = require('fs');

module.exports = (client, Discord) => {
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));
    if(!Discord){
        //just to make eslint happy :)
    }
    for(const file of command_files){
        const command = require(`../commands/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}