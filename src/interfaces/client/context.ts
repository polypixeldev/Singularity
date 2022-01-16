import CommandExecutor from "../../types/commandexecutor";

export default interface Context {
	name: string;
	type: string;
	execute: CommandExecutor;
}
