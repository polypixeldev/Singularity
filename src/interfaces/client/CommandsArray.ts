import Discord from "discord.js";

import type Option from "./Option.js";
import type CommandExecutor from "../../types/CommandExecutor.js";

type CommandsArray = {
	name: string;
	type: Discord.ApplicationCommandType;
	description?: string;
	options?: Option[];
	example?: string;
	notes?: string;
	slashExecute?: CommandExecutor;
}[];

export default CommandsArray;
