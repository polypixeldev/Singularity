import { BitField } from "discord.js";

export default (discord, client, req, res) => {
	discord
		.get("https://discord.com/api/users/@me")
		.then((apiRes) => {
			discord
				.get(
					`https://cdn.discordapp.com/avatars/${apiRes.data.id}/${apiRes.data.avatar}`,
					{
						responseType: "arraybuffer",
					}
				)
				.then((avatarRes) => {
					apiRes.data.avatar = Buffer.from(avatarRes.data, "binary").toString(
						"base64"
					);

					discord
						.get(`https://discord.com/api/users/@me/guilds`)
						.then(async (guildsRes) => {
							const promises = [];
							for (let i = 0; i < guildsRes.data.length; i++) {
								const ev = { available: false, data: null, guild: null };

								client.emit("guildAvailable", ev, guildsRes.data[i].id);

								guildsRes.data[i].available = ev.available;
								const permissions = new BitField(guildsRes.data[i].permissions);
								guildsRes.data[i].manageable = permissions.has(1 << 5);
								if (ev.data)
									promises.push(
										ev.data.then((data) => (guildsRes.data[i].data = data))
									);
								if (ev.guild)
									promises.push(
										ev.guild.then(
											(guild) =>
												(guildsRes.data[i].nickname = guild.me.nickname ?? "")
										)
									);
							}

							await Promise.all(promises);

							apiRes.data.guilds = guildsRes.data;
							res.json({
								code: 0,
								data: apiRes.data,
							});
						})
						.catch(() => {
							res.json({
								code: 1,
							});
						});
				})
				.catch(() => {
					res.json({
						code: 1,
					});
				});
		})
		.catch(() => {
			res.json({
				code: 1,
			});
		});
};
