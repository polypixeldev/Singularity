import Singularity from "../interfaces/singularity";
import { CommandInteraction, ContextMenuInteraction } from "discord.js";
import { HydratedDocument } from "mongoose";

import { Server } from "../database/schema/server";

type CommandExecutor = (
	client: Singularity,
	interaction: CommandInteraction | ContextMenuInteraction,
	serverDoc: HydratedDocument<Server>
) => void;

export default CommandExecutor;
