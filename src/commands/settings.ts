import Discord from "discord.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "settings",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "mod",
	description: "Singularity Settings",
	options: [],
	example: "settings",
} as Command;
