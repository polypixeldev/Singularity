export default async (Discord, client, member) => {
	const serverDoc = await client.utils.loadGuildInfo(client, member.guild);
	const channel = member.guild.channels.resolve(serverDoc.leaveChannelID);
	if (!channel) return;
	const tagRegex = /{tag}/g;
	const nameRegex = /{name}/g;
	let leaveMsg1 = serverDoc.leaveMessage.replace(
		tagRegex,
		`${member.user.tag}`
	);
	let leaveMsg2 = leaveMsg1.replace(nameRegex, `${member.user.username}`);

	channel.send({ content: leaveMsg2 });
};
