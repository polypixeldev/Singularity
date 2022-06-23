import { Schema, Types } from "mongoose";
import { Snowflake } from "discord.js";

import type Item from "../../interfaces/user/Item.js";

export interface Server {
	guildID: Snowflake;
	welcomeMessage: string;
	welcomeChannelID: string;
	leaveChannelID: string;
	leaveMessage: string;
	reactionRoles: string[][];
	ms: Types.ObjectId[];
	items: Item[];
	types: string[];
}

export const ServerSchema = new Schema({
	guildID: String,
	welcomeMessage: String,
	welcomeChannelID: String,
	leaveChannelID: String,
	leaveMessage: String,
	reactionRoles: Array,
	ms: [{ type: Schema.Types.ObjectId, ref: "Users" }],
	items: Array,
	types: Array,
});
