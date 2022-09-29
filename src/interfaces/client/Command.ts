import Discord from "discord.js";

import type Option from "./Option.js";
import type CommandExecutor from "../../types/CommandExecutor.js";

export default interface Command {
	name: string;
	description: string;
	type: Discord.ApplicationCommandType;
	category: string;
	options: Option[];
	example?: string;
	notes?: string;
	slashExecute?: CommandExecutor;
}
