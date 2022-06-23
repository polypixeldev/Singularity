import { ContextMenuInteraction } from "discord.js";
import { HydratedDocument } from "mongoose";

import Singularity from "../interfaces/singularity.js";
import { Server } from "../database/schema/server.js";

type ContextExecutor = (
	client: Singularity,
	interaction: ContextMenuInteraction,
	serverDoc: HydratedDocument<Server>
) => void;

export default ContextExecutor;
