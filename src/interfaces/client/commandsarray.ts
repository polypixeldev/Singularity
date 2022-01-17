import Option from "./option";
import CommandExecutor from "../../types/commandexecutor";

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
