import Option from "./option.js";
import CommandExecutor from "../../types/commandexecutor.js";

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
