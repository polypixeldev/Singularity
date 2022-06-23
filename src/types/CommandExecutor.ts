import type { CommandInteraction, ContextMenuInteraction } from "discord.js";
import type { HydratedDocument } from "mongoose";

import type Singularity from "../interfaces/singularity.js";
import type { Server } from "../database/schema/server.js";

type CommandExecutor = (
	client: Singularity,
	interaction: CommandInteraction | ContextMenuInteraction,
	serverDoc: HydratedDocument<Server>
) => void;

export default CommandExecutor;
