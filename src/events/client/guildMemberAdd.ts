import Discord from "discord.js";

import loadGuildInfo from "../../util/loadGuildInfo";

import Singularity from "../../interfaces/singularity";

export default async (client: Singularity, member: Discord.GuildMember) => {
	const serverDoc = await loadGuildInfo(client, member.guild);
	const channel = member.guild.channels.resolve(serverDoc.welcomeChannelID);
	if (!channel) return;
	const tagRegex = /{tag}/g;
	const nameRegex = /{name}/g;
	const mentionRegex = /{mention}/g;
	let welcomeMsg = serverDoc.welcomeMessage.replace(
		tagRegex,
		`${member.user.tag}`
	);
	welcomeMsg = welcomeMsg.replace(nameRegex, `${member.user.username}`);
	welcomeMsg = welcomeMsg.replace(mentionRegex, `<@${member.user.id}>`);

	if (!("send" in channel)) {
		return;
	}

	channel.send({ content: welcomeMsg });
	// if(member.guild.id === '822162764964560937'){
	// member.guild.roles.fetch('824074694101041182').then(role => {
	//   member.roles.add(role)});
	//   if(member.user.id === '755451090375278613'){
	//     member.guild.roles.fetch('836715599819571220').then(role => {
	//       member.roles.add(role)
	//     });
	//   }
	// }
};
