import type Context from "../interfaces/client/context.js";

export default {
	name: "Kick User",
	type: "USER",
	async execute(client, interaction, serverDoc) {
		const slashExecute = (await import("../commands/kick.js")).default
			.slashExecute;

		if (!slashExecute) {
			return;
		}

		slashExecute(client, interaction, serverDoc);
	},
} as Context;
