import type CommandExecutor from "../../types/CommandExecutor.js";

export default interface Option {
	name: string;
	description: string;
	type: string;
	required?: boolean;
	options?: Option[];
	example?: string;
	notes?: string;
	slashExecute?: CommandExecutor;
}
