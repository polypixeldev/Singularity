import type ContextExecutor from "../../types/ContextExecutor.js";

export default interface Context {
	name: string;
	type: string;
	execute: ContextExecutor;
}
