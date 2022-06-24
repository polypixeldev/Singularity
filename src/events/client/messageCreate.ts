import Discord from "discord.js";

import loadGuildInfo from "../../util/loadGuildInfo.js";
import loadUserInfo from "../../util/loadUserInfo.js";
import updateUser from "../../util/updateUser.js";
import manageUse from "../../util/manageUse.js";

import type Singularity from "../../interfaces/singularity.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cooldowns: any = {};

const levelArr = [200, 500, 1000, 2000, 5000, 9000, 14000, 20000, 28000, 40000];

setInterval(() => {
	for (const person in cooldowns) {
		if (cooldowns[person] > 0) cooldowns[person]--;
	}
}, 1000);

function getArgs(commandLine: string) {
	let doubleDoubleQuote = "<DDQ>";
	while (commandLine.indexOf(doubleDoubleQuote) > -1) doubleDoubleQuote += "@";
	const noDoubleDoubleQuotes = commandLine.replace(/""/g, doubleDoubleQuote);
	let spaceMarker = "<SP>";
	while (commandLine.indexOf(spaceMarker) > -1) spaceMarker += "@";
	const noSpacesInQuotes = noDoubleDoubleQuotes.replace(
		/"([^"]*)"?/g,
		(fullMatch, capture) => {
			return capture
				.replace(/ /g, spaceMarker)
				.replace(RegExp(doubleDoubleQuote, "g"), '"');
		}
	);
	const mangledParamArray = noSpacesInQuotes.split(/ +/);
	const paramArray = mangledParamArray.map((mangledParam) => {
		return mangledParam
			.replace(RegExp(spaceMarker, "g"), " ")
			.replace(RegExp(doubleDoubleQuote, "g"), "");
	});
	return paramArray;
}

export default async (client: Singularity, msg: Discord.Message) => {
	if (msg.author.bot || msg.channel.type === "DM" || !msg.guild) return;

	const serverDoc = await loadGuildInfo(client, msg.guild);
	const userMS = await loadUserInfo(client, serverDoc, msg.author.id);

	if (!msg.author.bot) {
		if (!cooldowns[msg.author.id]) {
			cooldowns[msg.author.id] = 0;
		}

		const prevExp = userMS.lifeExp;
		if (cooldowns[msg.author.id] === 0) {
			let addProton = Math.floor(5 + Math.random() * 5);
			let addElectron = Math.floor(5 + Math.random());
			let addDarkMatter = Math.random() < 0.001 ? 1 : 0;
			[addProton, addElectron, addDarkMatter] = manageUse.message(
				userMS,
				addProton,
				addElectron,
				addDarkMatter
			);
			userMS.protons += addProton;
			userMS.electrons += addElectron;
			userMS.darkMatter += addDarkMatter;
			userMS.lifeExp += Math.floor(10 + addProton + addElectron * 2.5);
			cooldowns[msg.author.id] = 60;
		}
		let index = 1;
		for (const value of levelArr) {
			if (prevExp < value && userMS.lifeExp >= value) {
				msg.channel.send({
					content: `Level up! Your Singularity is now level **${index}**!`,
				});
			}
			index++;
		}

		await updateUser(client, serverDoc.guildID, userMS.userID, {
			...userMS.toObject(),
			protons: userMS.protons,
			electrons: userMS.electrons,
			darkMatter: userMS.darkMatter,
			lifeExp: userMS.lifeExp,
			activity: new Date(Date.now()),
		});
	}

	if (!msg.content.startsWith(".") || msg.author.bot) return;

	const args = getArgs(msg.content.slice(1));
	const cmd = args.shift()?.toLowerCase();

	if (!cmd) {
		return;
	}

	const command = client.commands.get(cmd);

	if (!command) return;

	const warning = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setTitle("Message-Based Command Deprecation")
		.setDescription(
			"Uhoh! It look like you're using Singularity's old message-based commands. **Message-based commands have been removed.** Please switch to using Singularity's brand-new slash commands!"
		);

	msg.author.send({ embeds: [warning] });
};
