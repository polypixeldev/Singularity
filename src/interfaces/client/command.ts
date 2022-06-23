import type Option from "./option.js";
import type CommandExecutor from "../../types/commandexecutor.js";

export default interface Command {
	name: string;
	description: string;
	type: string;
	options: Option[];
	example?: string;
	notes?: string;
	slashExecute?: CommandExecutor;
}
