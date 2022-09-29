import Discord from "discord.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "poll",
	description: "Manage polls",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "general",
	options: [],
} as Command;
