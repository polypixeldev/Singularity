const prettyMS = require('pretty-ms');

const Shop = require('./singularity/shop/shop.js');
const Upgrade =  require('./singularity/upgrade.js');
const Use = require('./singularity/use.js');
const Info = require('./singularity/info.js');
const Mod = require('./singularity/mod/mod.js');

module.exports = {
    name: 'mysingularity',
    description: 'Manage your Singularity and view the Singularities of others!',
    type: 'ms',
    args: ['!<@user | upgrade | shop>'],
    aliases: ['ms'],
    example: 'singularity',
    async execute(client, Discord, msg, args, serverDoc){
		const items = [
			{
				name: 'Tiny Trophy',
				protons: 1000000,
				electrons: 500000,
				darkMatter: 0
			},
			{
				name: 'Regular Trophy',
				protons: 10000000,
				electrons: 1000000,
				darkMatter: 1
			},
			{
				name: 'Giant Trophy',
				protons: 1000000000,
				electrons: 10000000,
				darkMatter: 5
			}
		]

		const powerUps = [
			{
				name: '2x Proton Boost',
				protons: 0,
				electrons: 500,
				darkMatter: 0,
				time: 10000
			},
			{
				name: '2x Electron Boost',
				protons: 5000,
				electrons: 0,
				darkMatter: 0,
				time: 10000
			}
		]

		if(args[0] === 'upgrade'){
			Upgrade(client, Discord, msg, args, serverDoc);
		} else if(args[0] === 'shop'){
			if(args[1] === 'buy'){
				Shop.buy(client, Discord, msg, args, serverDoc, items, powerUps);
			} else if(args[1] === 'sell'){
				Shop.sell(client, Discord, msg, args, serverDoc, items, powerUps);
			} else {
				Shop.shop(client, Discord, msg, args, serverDoc, items, powerUps)
			}
		} else if(args[0] === 'use'){
			Use(client, Discord, msg, args, serverDoc, items, powerUps)
		} else if(args[0] === 'info'){
			Info(client, Discord, msg, args, serverDoc);
		} else if(args[0] === 'mod'){
			Mod(client, Discord, msg, args, serverDoc);
		} else  {
			let user = msg.mentions.users.first() ? msg.mentions.users.first() : msg.author;
			if(user.bot){
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription('Bots are not powerful enough to have their own Singularity!');

				return msg.channel.send(embed);
			}
			let userMS = await client.utils.loadMsInfo(serverDoc, user.id);
			
			let itemStr = '\n'
			for(let item of userMS.items){
				itemStr = itemStr + `- **${item}** \n `;
			}
			if(itemStr === '\n') itemStr = "**None**";

			let pStr = '\n'
			for(let p of userMS.powerUps){
				pStr = pStr + `- **${p}** \n `;
			}
			if(pStr === '\n') pStr = '**None**';

			let aStr = '\n'
			for(let a of userMS.active){
				aStr = aStr + `- **${a.name}** - ${prettyMS(a.time - (Date.now() - a.start))}** \n `;
			}
			if(aStr === '\n') aStr = '**None**';	

			const embed = new Discord.MessageEmbed()
			.setTitle(`${user.tag}'s Singularity`)
			.setColor(0x000000)
			//.setThumbnail('https://cdn.discordapp.com/avatars/835256019336036423/05dde3d48f1a67659be4837607746eb7.webp')
			.setThumbnail(user.displayAvatarURL())
			.setDescription(`
				***------USER STATS------***
				Protons: **${userMS.protons}**
				Electrons: **${userMS.electrons}**
				Dark Matter: **${userMS.darkMatter}**
				Items: ${itemStr}
				Power-Ups: ${pStr}
				Active Power-Ups: ${aStr}
				Lifetime Experience: **${userMS.lifeExp}**

				***------SINGULARITY STATS------***
				Singularity Type: **${userMS.singularity.type}**
				Singularity Size: **${userMS.singularity.size}**
				Singularity Ferocity: **${userMS.singularity.ferocity}**
			`)
			.setFooter(`${user.tag}'s Singularity requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

			msg.channel.send(embed);
			
		}
	}	
}