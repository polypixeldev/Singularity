import type Option from "./Option.js";
import type CommandExecutor from "../../types/CommandExecutor.js";

export default interface Command {
	name: string;
	description: string;
	type: string;
	options: Option[];
	example?: string;
	notes?: string;
	slashExecute?: CommandExecutor;
}
