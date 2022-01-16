import fs from "fs";

export default async (Discord, client) => {
	console.log("Loading Slash (/) Command Data...");
	console.time("Finished Loading Slash (/) Command Data in");

	const command_files = fs
		.readdirSync("./prod/commands/")
		.filter((file) => file.endsWith("js"));

	const basicCmds = new Discord.Collection();
	for (const file of command_files) {
		const command = (await import(`../commands/${file}`)).default;
		if (command.name) {
			basicCmds.set(command.name, command);
		} else {
			continue;
		}
	}

	client.user.id = process.env.CLIENT_ID;
	const slashCommands = basicCmds.map(async (command) => {
		const slashCmd = {
			name: command.name,
			type: command.type,
			description: command.description,
			options: command.options,
			defaultPermission: command.defaultPermission,
			example: command.example,
			notes: command.notes,
			slashExecute: command.slashExecute,
		};
		if (fs.existsSync(`./prod/commands/${command.name}/`)) {
			const sub_dir = fs.readdirSync(`./prod/commands/${command.name}/`, {
				withFileTypes: true,
			});
			for (const ent of sub_dir) {
				if (ent.isDirectory()) {
					if (ent.name === command.name) continue;
					const grp_meta = (
						await import(`../commands/${command.name}/${ent.name}/meta.json`)
					).default;
					const index =
						slashCmd.options.push({
							name: ent.name,
							description: grp_meta.description,
							type: "SUB_COMMAND_GROUP",
							options: [],
						}) - 1;
					const subgrp_cmds = fs
						.readdirSync(`./prod/commands/${command.name}/${ent.name}/`)
						.filter((file) => file.endsWith("js"));
					for (const subgrp_cmd_name of subgrp_cmds) {
						if (subgrp_cmd_name === ".meta.js") continue;
						const subgrp_cmd = await import(
							`../commands/${command.name}/${ent.name}/${subgrp_cmd_name}`
						);
						slashCmd.options[index].options.push({
							name: subgrp_cmd.name,
							description: subgrp_cmd.description,
							type: "SUB_COMMAND",
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
						type: "SUB_COMMAND",
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

	console.timeEnd("Finished Loading Slash (/) Command Data in");

	console.log("Loading Context Menu Data...");
	console.time("Finished Loading Context Menu Data in");

	const context_files = fs
		.readdirSync("./prod/contexts/")
		.filter((file) => file.endsWith("js"));

	for (const file of context_files) {
		const context = (await import(`../contexts/${file}`)).default;
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

		client.application.commands
			.set(slashCommands, process.env.DEV_GUILD_ID)
			.then(() => {
				console.timeEnd(
					`Finished Sending Slash (/) Command Data to Discord for Guild ${process.env.DEV_GUILD_ID} in`
				);
			});
	} else if (process.argv[2] === "-D") {
		console.log(`Sending Slash (/) Command Data to Discord Globally`);
		console.time(
			`Finished Sending Slash (/) Command Data to Discord Globally in`
		);
		client.application.commands.set(slashCommands).then(() => {
			console.timeEnd(
				`Finished Sending Slash (/) Command Data to Discord Globally in`
			);
		});
	} else if (process.argv[2] === "-r") {
		console.log(
			`Removing All Slash (/) Commands from Guild ${process.env.DEV_GUILD_ID}...`
		);
		console.time(
			`Removed All Slash (/) Commands from Guild ${process.env.DEV_GUILD_ID} in`
		);
		client.application.commands.set([], process.env.DEV_GUILD_ID).then(() => {
			console.timeEnd(
				`Removed All Slash (/) Commands from Guild ${process.env.DEV_GUILD_ID} in`
			);
		});
	} else if (process.argv[2] === "-R") {
		console.log(`Removing All Slash (/) Commands Globally...`);
		console.time(`Removed All Slash (/) Commands Globally in`);
		client.application.commands.set([]).then(() => {
			console.timeEnd(`Removed All Slash (/) Commands Globally in`);
		});
	}
};
