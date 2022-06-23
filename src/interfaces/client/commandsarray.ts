import type Option from "./option.js";
import type CommandExecutor from "../../types/commandexecutor.js";

type CommandsArray = {
	name: string;
	type: string;
	description?: string;
	options?: Option[];
	example?: string;
	notes?: string;
	slashExecute?: CommandExecutor;
}[];

export default CommandsArray;
