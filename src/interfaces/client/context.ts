import type ContextExecutor from "../../types/contextexecutor.js";

export default interface Context {
	name: string;
	type: string;
	execute: ContextExecutor;
}
