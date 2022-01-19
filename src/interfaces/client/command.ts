import Option from "./option";
import CommandExecutor from "../../types/commandexecutor";

export default interface Command {
	name: string;
	description: string;
	type: string;
	options: Option[];
	example?: string;
	notes?: string;
	slashExecute?: CommandExecutor;
}
