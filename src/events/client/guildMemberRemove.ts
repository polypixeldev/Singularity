import Discord from "discord.js";

import loadGuildInfo from "../../util/loadGuildInfo.js";

import type Singularity from "../../interfaces/singularity.js";

export default async (client: Singularity, member: Discord.GuildMember) => {
	const serverDoc = await loadGuildInfo(client, member.guild);
	const channel = member.guild.channels.resolve(serverDoc.leaveChannelID);
	if (!channel) return;
	const tagRegex = /{tag}/g;
	const nameRegex = /{name}/g;
	const leaveMsg1 = serverDoc.leaveMessage.replace(
		tagRegex,
		`${member.user.tag}`,
	);
	const leaveMsg2 = leaveMsg1.replace(nameRegex, `${member.user.username}`);

	if (!("send" in channel)) {
		return;
	}

	channel.send({ content: leaveMsg2 });
};
