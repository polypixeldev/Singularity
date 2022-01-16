export default (guild, tag) => {
	const member = guild.members.cache.find((member) => member.user.tag === tag);
	if (member) {
		return member.user;
	} else {
		return;
	}
};
