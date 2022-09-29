import Discord from "discord.js";

import type ContextExecutor from "../../types/ContextExecutor.js";

export default interface Context {
	name: string;
	type: Discord.ApplicationCommandType;
	execute: ContextExecutor;
}
