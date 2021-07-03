const fs = require('fs');
module.exports = (Discord, client) => {
	const util_files = fs.readdirSync('./util/').filter(file => file.endsWith('js'));

    for(const file of util_files){
        const util = require(`../util/${file}`);
        console.log(util.name);
        if(util.name){
            client.utils.set(util.name, util);
        } else {
            continue;
        }
    }
}