module.exports = {
    name: 'addprofilefield',
    description: "Adds a field to your profile",
    type: 'perks',
    execute(msg, args, fs, Discord, configArr){
        let fieldName = args.shift();
        let fieldContent = args.join(' ');

        configArr[1][msg.author.id][fieldName] = fieldContent;

        const raw = JSON.stringify(configArr, null, 2);
        fs.writeFileSync('config.json', raw);

        const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(`Field \`${fieldName}\` added and set to \`${fieldContent}\`!`);
        
        msg.channel.send(embed);
    }
}