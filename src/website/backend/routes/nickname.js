module.exports = (discord, client, req, res) => {
	discord
		.get("https://discord.com/api/users/@me")
		.then(async (apiRes) => {
			let ev = { code: 1 };
			client.emit(
				"nickname",
				ev,
				apiRes.data.id,
				req.body.guildID,
				req.body.nickname
			);
			res.json({
				code: await ev.code,
			});
		})
		.catch(() => {
			res.json({
				code: 1,
			});
		});
};
