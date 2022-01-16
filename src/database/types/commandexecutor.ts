import Singularity from "../../interfaces/singularity";
import DiscordImport, { Interaction } from "discord.js";
import { Model } from "mongoose";

import { Server } from "../schema/server";

type CommandExecutor = (
	client: Singularity,
	Discord: typeof DiscordImport,
	interaction: Interaction,
	serverDoc: Model<Server>
) => void;

export default CommandExecutor;
