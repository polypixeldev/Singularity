import Singularity from "../interfaces/singularity";
import { ContextMenuInteraction } from "discord.js";
import { HydratedDocument } from "mongoose";

import { Server } from "../database/schema/server";

type ContextExecutor = (
	client: Singularity,
	interaction: ContextMenuInteraction,
	serverDoc: HydratedDocument<Server>
) => void;

export default ContextExecutor;
