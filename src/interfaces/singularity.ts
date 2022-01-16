import { Client, Collection } from "discord.js";
import { Model } from "mongoose";

import { User } from "../database/schema/user";
import { Server } from "../database/schema/server";
import Command from "../database/interfaces/command";
import Context from "../database/interfaces/context";

export default interface Singularity extends Client {
	userModel: Model<User>;
	serverModel: Model<Server>;
	commands: Collection<string, Command>;
	contexts: Collection<string, Context>;
	utils: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
