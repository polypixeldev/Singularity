import fs from "fs";
import Discord from "discord.js";

import type Singularity from "../interfaces/singularity.js";
import type Command from "../interfaces/client/Command.js";
import type Context from "../interfaces/client/Context.js";
import type CommandsArray from "../interfaces/client/CommandsArray.js";

export default async (client: Singularity) => {
	console.log("Loading Slash (/) Command Data...");
	console.time("Finished Loading Slash (/) Command Data in");

	const command_files = fs
		.readdirSync("./build/commands/")
		.filter((file) => file.endsWith("js"));

	const basicCmds = new Discord.Collection<string, Command>();
	for (const file of command_files) {
		const command = (await import(`../commands/${file}`)).default;
		if (command.name) {
			basicCmds.set(command.name, command);
		} else {
			continue;
		}
	}

	if (!process.env.CLIENT_ID) {
		throw "The client ID must be set in the environment variables.";
	}

	if (!client.user) {
		throw new Error("Client user not available");
	}

	client.user.id = process.env.CLIENT_ID ?? "";
	const pendingSlashCommands = basicCmds.map(async (command: Command) => {
		const slashCmd = {
			name: command.name,
			type: command.type,
			category: command.category,
			description: command.description,
			options: command.options,
			example: command.example,
			notes: command.notes,
			slashExecute: command.slashExecute,
		};
		if (fs.existsSync(`./build/commands/${command.name}/`)) {
			const sub_dir = fs.readdirSync(`./build/commands/${command.name}/`, {
				withFileTypes: true,
			});
			for (const ent of sub_dir) {
				if (ent.isDirectory()) {
					if (ent.name === command.name) continue;
					const grp_meta = (
						await import(`../commands/${command.name}/${ent.name}/meta.json`, {
							assert: { type: "json" },
						})
					).default;
					const index =
						slashCmd.options.push({
							name: ent.name,
							description: grp_meta.description,
							type: Discord.ApplicationCommandOptionType.SubcommandGroup,
							options: [],
						}) - 1;
					const subgrp_cmds = fs
						.readdirSync(`./build/commands/${command.name}/${ent.name}/`)
						.filter((file) => file.endsWith("js"));
					for (const subgrp_cmd_name of subgrp_cmds) {
						if (subgrp_cmd_name === "meta.json") continue;
						const subgrp_cmd = (
							await import(
								`../commands/${command.name}/${ent.name}/${subgrp_cmd_name}`
							)
						).default;
						slashCmd.options[index].options?.push({
							name: subgrp_cmd.name,
							description: subgrp_cmd.description,
							type: Discord.ApplicationCommandOptionType.Subcommand,
							options: subgrp_cmd.options,
							example: subgrp_cmd.example,
							notes: subgrp_cmd.notes,
							slashExecute: subgrp_cmd.slashExecute,
						});
					}
				} else if (ent.name.endsWith("js")) {
					const sub_cmd = (
						await import(`../commands/${command.name}/${ent.name}`)
					).default;
					slashCmd.options.push({
						name: sub_cmd.name,
						description: sub_cmd.description,
						type: Discord.ApplicationCommandOptionType.Subcommand,
						options: sub_cmd.options,
						example: sub_cmd.example,
						notes: sub_cmd.notes,
						slashExecute: sub_cmd.slashExecute,
					});
				}
			}
		}
		client.commands.set(slashCmd.name, slashCmd);
		return slashCmd;
	});

	const slashCommands: CommandsArray = await Promise.all(pendingSlashCommands);

	console.timeEnd("Finished Loading Slash (/) Command Data in");

	console.log("Loading Context Menu Data...");
	console.time("Finished Loading Context Menu Data in");

	const context_files = fs
		.readdirSync("./build/contexts/")
		.filter((file) => file.endsWith("js"));

	for (const file of context_files) {
		const context: Context = (await import(`../contexts/${file}`)).default;
		if (context.name) {
			client.contexts.set(context.name, context);
			slashCommands.push({
				name: context.name,
				type: context.type,
			});
		} else {
			continue;
		}
	}

	console.timeEnd("Finished Loading Context Menu Data in");

	console.log("Singularity Commands Set");

	if (process.argv[2] === "-d") {
		console.log(
			`Sending Slash (/) Command Data to Discord for Guild ${process.env.DEV_GUILD_ID}...`
		);

		if (!process.env.DEV_GUILD_ID) {
			throw new ReferenceError("The development guild ID is not set!");
		}

		console.time(
			`Finished Sending Slash (/) Command Data to Discord for Guild ${process.env.DEV_GUILD_ID} in`
		);

		client.application?.commands
			// @ts-expect-error: String types also work
			.set(slashCommands, process.env.DEV_GUILD_ID)
			?.then(() => {
				console.timeEnd(
					`Finished Sending Slash (/) Command Data to Discord for Guild ${process.env.DEV_GUILD_ID} in`
				);
			});
	} else if (process.argv[2] === "-D") {
		console.log(`Sending Slash (/) Command Data to Discord Globally`);

		console.time(
			`Finished Sending Slash (/) Command Data to Discord Globally in`
		);

		// @ts-expect-error: The slash command array is valid
		client.application?.commands.set(slashCommands)?.then(() => {
			console.timeEnd(
				`Finished Sending Slash (/) Command Data to Discord Globally in`
			);
		});
	} else if (process.argv[2] === "-r") {
		console.log(
			`Removing All Slash (/) Commands from Guild ${process.env.DEV_GUILD_ID}...`
		);

		if (!process.env.DEV_GUILD_ID) {
			throw new ReferenceError("The development guild ID is not set!");
		}

		console.time(
			`Removed All Slash (/) Commands from Guild ${process.env.DEV_GUILD_ID} in`
		);

		client.application?.commands.set([], process.env.DEV_GUILD_ID)?.then(() => {
			console.timeEnd(
				`Removed All Slash (/) Commands from Guild ${process.env.DEV_GUILD_ID} in`
			);
		});
	} else if (process.argv[2] === "-R") {
		console.log(`Removing All Slash (/) Commands Globally...`);
		console.time(`Removed All Slash (/) Commands Globally in`);
		client.application?.commands.set([]).then(() => {
			console.timeEnd(`Removed All Slash (/) Commands Globally in`);
		});
	}
};
