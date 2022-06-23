import { Client, Collection } from "discord.js";
import { Model } from "mongoose";

import { User } from "../database/schema/user.js";
import { Server } from "../database/schema/server.js";
import Command from "./client/command.js";
import Context from "./client/context.js";

export default interface Singularity extends Client {
	userModel: Model<User>;
	serverModel: Model<Server>;
	commands: Collection<string, Command>;
	contexts: Collection<string, Context>;
}
