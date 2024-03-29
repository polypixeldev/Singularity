import { BitField } from "discord.js";

import type ApiRoute from "../../../interfaces/api/ApiRoute.js";
import type GuildAvailableEvent from "../../../interfaces/api/GuildAvailableEvent.js";

const handler: ApiRoute = (discord, client, req, res) => {
	discord
		.get("https://discord.com/api/users/@me")
		.then((apiRes) => {
			discord
				.get(
					`https://cdn.discordapp.com/avatars/${apiRes.data.id}/${apiRes.data.avatar}`,
					{
						responseType: "arraybuffer",
					},
				)
				.then((avatarRes) => {
					apiRes.data.avatar = Buffer.from(avatarRes.data, "binary").toString(
						"base64",
					);

					discord
						.get(`https://discord.com/api/users/@me/guilds`)
						.then(async (guildsRes) => {
							const promises = [];
							for (const guild of guildsRes.data) {
								const ev: GuildAvailableEvent = {
									available: false,
									data: undefined,
									guild: undefined,
								};

								client.emit("guildAvailable", ev, guild.id);

								guild.available = ev.available;
								const permissions = new BitField(guild.permissions);
								guild.manageable = permissions.has(1 << 5);
								if (ev.data)
									promises.push(ev.data.then((data) => (guild.data = data)));
								if (ev.guild)
									promises.push(
										ev.guild.then(
											(evGuild) =>
												(guild.nickname = evGuild.members.me?.nickname ?? ""),
										),
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

export default handler;
