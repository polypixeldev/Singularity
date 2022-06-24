import Discord from "discord.js";

import BaseEmbed from "../util/BaseEmbed.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "help",
	description: "Singularity Help",
	defaultPermission: true,
	options: [
		{
			name: "command",
			description: "The name of the command you want information about",
			required: false,
			type: "STRING",
		},
		{
			name: "argument",
			description: "The name of the argument you wish to view",
			required: false,
			type: "STRING",
		},
		{
			name: "group",
			description: "The name of a subcommand group within the command",
			required: false,
			type: "STRING",
		},
		{
			name: "subcommand",
			description:
				"The name of a subcommand within the command or subcommand group",
			required: false,
			type: "STRING",
		},
	],
	type: "general",
	args: ["!<command type>"],
	aliases: [],
	example: "help general",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });
		if (interaction.options.get("command")) {
			const command = client.commands.get(
				interaction.options.get("command")?.value as string
			);
			let subcommand;
			let group;
			if (!command) {
				const notFoundEmbed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						"That command does not exist! \n **NOTE:** *The full command name (not an alias) must be provided*"
					);
				return interaction.editReply({ embeds: [notFoundEmbed] });
			} else {
				if (interaction.options.get("group")) {
					group = command.options.find(
						(opt) =>
							opt.type === "SUB_COMMAND_GROUP" &&
							opt.name === interaction.options.get("group")?.value
					);
					if (!group) {
						const embed = new Discord.MessageEmbed()
							.setColor(0x000000)
							.setDescription("The specified subcommand group does not exist!");

						return interaction.editReply({ embeds: [embed] });
					}
				}

				if (interaction.options.get("subcommand")) {
					if (group) {
						if (!group.options) {
							return;
						}

						subcommand = group.options.find(
							(opt) =>
								opt.type === "SUB_COMMAND" &&
								opt.name === interaction.options.get("subcommand")?.value
						);
						if (!subcommand) {
							const embed = new Discord.MessageEmbed()
								.setColor(0x000000)
								.setDescription(
									"The specified subcommand does not exist within the specified group!"
								);

							return interaction.editReply({ embeds: [embed] });
						}
					} else {
						subcommand = command.options.find(
							(opt) =>
								opt.type === "SUB_COMMAND" &&
								opt.name === interaction.options.get("subcommand")?.value
						);
						if (!subcommand) {
							const embed = new Discord.MessageEmbed()
								.setColor(0x000000)
								.setDescription("The specified subcommand does not exist!");

							return interaction.editReply({ embeds: [embed] });
						}
					}
				}
			}

			if (!interaction.options.get("argument")?.value) {
				if (command && ((group && subcommand) || (!group && !subcommand))) {
					let argString;
					let subGrpStr = "";
					let subStr = "";

					if (!subcommand?.options) {
						return;
					}

					if (subcommand?.options.length ?? command.options.length > 0) {
						argString = ``;
						for (const arg of subcommand?.options ?? command.options) {
							if (arg.type === "SUB_COMMAND_GROUP") {
								subGrpStr = subGrpStr + ` - ${arg.name} \n`;
							} else if (arg.type === "SUB_COMMAND") {
								subStr = subStr + ` - ${arg.name} \n`;
							} else {
								argString =
									argString + `<${!arg.required ? "!" : ""}${arg.name}> `;
							}
						}
					} else {
						argString = ``;
					}

					const embed = new BaseEmbed("Singularity Help", interaction.user)
						.setTitle(
							`${command.name} - ${group ? `Group "${group.name}" - ` : ""}${
								subcommand ? `Subcommand "${subcommand.name}" - ` : ""
							} ${command.type.toUpperCase()}`
						)
						.setDescription(
							`${subcommand?.description ?? command.description}
            **Usage**:
            \`\`\`/${command.name} ${group ? `${group.name} ` : ""}${
								subcommand ? `${subcommand.name} ` : ""
							} ${argString}\`\`\`
            **Example:**
            \`\`\`${subcommand?.example ?? command.example}\`\`\`
            **Notes:**
            \`\`\`${subcommand?.notes ?? command.notes ?? "none"}\`\`\`
            **Subcommand Groups:**
            \`\`\`${subGrpStr !== "" ? subGrpStr : "None"}\`\`\`
            **Subcommands:**
            \`\`\`${subStr !== "" ? subStr : "None"}\`\`\`
        `
						);

					return interaction.editReply({ embeds: [embed] });
				} else if (group) {
					let subStr = "";
					if (!group.options) {
						return;
					}

					for (const subcmd of group.options) {
						subStr = subStr + ` - **${subcmd.name}** \n`;
					}

					const embed = new BaseEmbed("Singularity Help", interaction.user)
						.setTitle(
							`${command.name} - Group "${
								group.name
							}" - ${command.type.toUpperCase()}`
						)
						.setDescription(
							`
            ${group.description}
            **Subcommands:**
            ${subStr}
            `
						);

					return interaction.editReply({ embeds: [embed] });
				}
			} else {
				const main = subcommand ?? command;
				if (
					!main.options?.find(
						(option) =>
							option.name === interaction.options.get("argument")?.value
					)
				) {
					const argNotFoundEmbed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription(
							"That argument does not exist! \n **NOTE:** *The full command name (not an alias) must be provided*"
						);

					return interaction.editReply({ embeds: [argNotFoundEmbed] });
				} else {
					const main = subcommand ?? command;
					const argument = main.options?.find(
						(option) =>
							option.name === interaction.options.get("argument")?.value
					);
					const argEmbed = new BaseEmbed("Singularity Help", interaction.user)
						.setTitle(
							`${command.name} - ${group ? `Group "${group.name}" - ` : ""}${
								subcommand ? `Subcommand "${subcommand.name}" - ` : ""
							} Argument ${argument?.name}`
						)
						.addFields([
							{
								name: "Description",
								value: argument?.description as string,
							},
							{
								name: "Type",
								value: argument?.type as string,
							},
							{
								name: "Required",
								value: argument?.required?.toString() ?? "False",
							},
						]);

					return interaction.editReply({ embeds: [argEmbed] });
				}
			}
		} else {
			const generalEmbed = new BaseEmbed(
				"Singularity Help",
				interaction.user
			).setTitle("Singularity General Commands");

			const modEmbed = new BaseEmbed(
				"Singularity Help",
				interaction.user
			).setTitle("Singularity Moderation Commands");

			const msEmbed = new BaseEmbed(
				"Singularity Help",
				interaction.user
			).setTitle("My Singularity Commands");

			for (const command of client.commands) {
				if (command[1].type === "general") {
					const desc = [];

					for (const option of command[1].options) {
						if (option.type === "SUB_COMMAND_GROUP") {
							desc.push(`\n \`${option.name}\` - ${option.description}`);
							if (!option.options) {
								return;
							}
							for (const subcmd of option.options) {
								desc.push(
									`\n :arrow_forward: \`${subcmd.name}\` - ${subcmd.description}`
								);
							}
							desc.push("\n");
						} else if (option.type === "SUB_COMMAND") {
							desc.push(`\n \`${option.name}\` - ${option.description} \n`);
						}
					}

					desc.unshift(`${command[1].description} \n`);

					generalEmbed.addField(`\`/${command[1].name}\``, desc.join(""));
				} else if (command[1].type === "mod") {
					const desc = [];

					for (const option of command[1].options) {
						if (option.type === "SUB_COMMAND_GROUP") {
							desc.push(`\n \`${option.name}\` - ${option.description}`);

							if (!option.options) {
								return;
							}

							for (const subcmd of option.options) {
								desc.push(
									`\n :arrow_forward: \`${subcmd.name}\` - ${subcmd.description}`
								);
							}
							desc.push("\n");
						} else if (option.type === "SUB_COMMAND") {
							desc.push(`\n \`${option.name}\` - ${option.description} \n`);
						}
					}

					desc.unshift(`${command[1].description} \n`);

					modEmbed.addField(`\`/${command[1].name}\``, desc.join(""));
				} else if (command[1].type === "ms") {
					const desc = [];

					for (const option of command[1].options) {
						if (option.type === "SUB_COMMAND_GROUP") {
							desc.push(`\n \`${option.name}\` - ${option.description}`);

							if (!option.options) {
								return;
							}

							for (const subcmd of option.options) {
								desc.push(
									`\n :arrow_forward: \`${subcmd.name}\` - ${subcmd.description}`
								);
							}
							desc.push("\n");
						} else if (option.type === "SUB_COMMAND") {
							desc.push(`\n \`${option.name}\` - ${option.description} \n`);
						}
					}

					desc.unshift(`${command[1].description} \n`);

					msEmbed.setDescription(`\`/ms\`\n ${desc.join("")}`);
				}
			}
			let latestEmbed = new BaseEmbed(
				"Singularity Help",
				interaction.user
			).setDescription(
				`
            			*Use \`/help <command>\` to learn more about a command*

						Select a category from the select menu below to explore available commands!
        			`
			);

			const components = [
				{
					type: "ACTION_ROW" as const,
					components: [
						{
							type: "SELECT_MENU" as const,
							label: "Command Category",
							custom_id: "type",
							options: [
								{
									label: "General",
									value: "general",
									description: "General Singularity Commands",
								},
								{
									label: "Moderation",
									value: "mod",
									description: "Moderation Singularity Commands",
								},
								{
									label: "My Singularity",
									value: "ms",
									description: "My Singularity Commands",
								},
							],
						},
					],
				},
			];

			interaction
				.editReply({
					embeds: [latestEmbed],
					components: components,
				})
				.then((sent) => {
					if (!(sent instanceof Discord.Message)) {
						return;
					}

					const collector = sent.createMessageComponentCollector({
						componentType: "SELECT_MENU",
						time: 300000,
						dispose: true,
					});

					collector.on("collect", async (selection) => {
						await selection.deferUpdate();

						latestEmbed =
							selection.values[0] === "general"
								? generalEmbed
								: selection.values[0] === "mod"
								? modEmbed
								: msEmbed;

						selection.editReply({
							embeds: [latestEmbed],
							components: components,
						});
					});

					collector.on("end", () => {
						interaction.editReply({
							embeds: [latestEmbed],
							components: components,
						});
					});
				});
		}
	},
} as Command;
