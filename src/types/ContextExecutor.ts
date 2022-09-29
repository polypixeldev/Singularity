import type { ContextMenuCommandInteraction } from "discord.js";
import type { HydratedDocument } from "mongoose";

import type Singularity from "../interfaces/singularity.js";
import type { Server } from "../database/schema/server.js";

type ContextExecutor = (
	client: Singularity,
	interaction: ContextMenuCommandInteraction,
	serverDoc: HydratedDocument<Server>
) => void;

export default ContextExecutor;
