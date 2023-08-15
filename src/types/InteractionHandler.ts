import type {
	ChatInputCommandInteraction,
	ContextMenuCommandInteraction,
} from "discord.js";

import type Singularity from "../interfaces/singularity.js";

type CommandInteractionHandler = (
	client: Singularity,
	interaction: ChatInputCommandInteraction,
) => void;

type ContextInteractionHandler = (
	client: Singularity,
	interaction: ContextMenuCommandInteraction,
) => void;

export type { CommandInteractionHandler, ContextInteractionHandler };
