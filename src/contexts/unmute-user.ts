import Context from "../interfaces/client/context.js";

export default {
	name: "Unmute User",
	type: "USER",
	async execute(client, interaction, serverDoc) {
		const slashExecute = (await import("../commands/unmute.js")).default
			.slashExecute;

		if (!slashExecute) {
			return;
		}

		slashExecute(client, interaction, serverDoc);
	},
} as Context;
