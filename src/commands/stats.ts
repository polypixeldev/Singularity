import Discord from "discord.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "stats",
	description: "Displays statistics about Singularity and the current server",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "general",
	options: [],
	example: "stats server membercount",
} as Command;
