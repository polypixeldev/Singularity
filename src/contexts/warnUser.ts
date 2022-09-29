import Discord from "discord.js";

import type Context from "../interfaces/client/Context.js";

export default {
	name: "Warn User",
	type: Discord.ApplicationCommandType.User,
	async execute(client, interaction, serverDoc) {
		const slashExecute = (await import("../commands/warn.js")).default
			.slashExecute;

		if (!slashExecute) {
			return;
		}

		slashExecute(client, interaction, serverDoc);
	},
} as Context;
