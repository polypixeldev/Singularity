import type {
	CommandInteraction,
	ContextMenuCommandInteraction,
} from "discord.js";
import type { HydratedDocument } from "mongoose";

import type Singularity from "../interfaces/singularity.js";
import type { Server } from "../database/schema/server.js";

type CommandExecutor = (
	client: Singularity,
	interaction: CommandInteraction | ContextMenuCommandInteraction,
	serverDoc: HydratedDocument<Server>,
) => void | Promise<void>;

export default CommandExecutor;
