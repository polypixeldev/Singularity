import type { ContextMenuInteraction } from "discord.js";
import type { HydratedDocument } from "mongoose";

import type Singularity from "../interfaces/singularity.js";
import type { Server } from "../database/schema/server.js";

type ContextExecutor = (
	client: Singularity,
	interaction: ContextMenuInteraction,
	serverDoc: HydratedDocument<Server>
) => void;

export default ContextExecutor;
