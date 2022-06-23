import type Command from "../interfaces/client/Command.js";

export default {
	name: "stats",
	description: "Displays statistics about Singularity and the current server",
	type: "general",
	options: [],
	example: "stats server membercount",
} as Command;
