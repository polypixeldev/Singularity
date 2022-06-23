import { CommandInteraction, ContextMenuInteraction } from "discord.js";
import { HydratedDocument } from "mongoose";

import Singularity from "../interfaces/singularity.js";
import { Server } from "../database/schema/server.js";

type CommandExecutor = (
	client: Singularity,
	interaction: CommandInteraction | ContextMenuInteraction,
	serverDoc: HydratedDocument<Server>
) => void;

export default CommandExecutor;
