import ContextExecutor from "../../types/contextexecutor";

export default interface Context {
	name: string;
	type: string;
	execute: ContextExecutor;
}
