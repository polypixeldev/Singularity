import type ApiRoute from "../../../interfaces/api/ApiRoute.js";

import type AsyncApiEvent from "../../../interfaces/api/AsyncApiEvent.js";

const handler: ApiRoute = (discord, client, req, res) => {
	discord
		.get("https://discord.com/api/users/@me")
		.then(async (apiRes) => {
			const ev: AsyncApiEvent = { code: 1 };
			client.emit(
				"updateGuild",
				ev,
				apiRes.data.id,
				req.body.guildID,
				req.body.data,
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

export default handler;
