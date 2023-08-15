import Discord from "discord.js";
import { startTransaction, configureScope } from "@sentry/node";

import loadGuildInfo from "../../../util/loadGuildInfo.js";
import captureException from "../../../util/captureException.js";

import type { CommandInteractionHandler } from "../../../types/InteractionHandler.js";

const handler: CommandInteractionHandler = async (client, interaction) => {
	const commandTransaction = startTransaction({
		op: "command",
		name: "Command Interaction",
	});

	configureScope((scope) => {
		scope.setSpan(commandTransaction);
	});

	const dataTransaction = commandTransaction.startChild({
		op: "command",
		description: "Fetch command data",
	});

	if (!(interaction instanceof Discord.CommandInteraction)) {
		dataTransaction.finish();
		commandTransaction.finish();
		return;
	}

	console.log(
		`Command Interaction Recieved - ${interaction.commandName} from ${interaction.user.tag} in ${interaction.guild?.name}`,
	);
	if (!client.commands.has(interaction.commandName) || !interaction.guild) {
		dataTransaction.finish();
		commandTransaction.finish();
		return;
	}

	const serverDoc = await loadGuildInfo(client, interaction.guild);

	let executor = null;

	if (interaction.options.getSubcommandGroup(false)) {
		executor = client.commands
			.get(interaction.commandName)
			?.options.find(
				(cmd) => cmd.name === interaction.options.getSubcommandGroup(),
			)
			?.options?.find((cmd) => cmd.name === interaction.options.getSubcommand())
			?.slashExecute;
	} else if (interaction.options.getSubcommand(false)) {
		executor = client.commands
			.get(interaction.commandName)
			?.options.find((cmd) => cmd.name === interaction.options.getSubcommand())
			?.slashExecute;
	} else {
		executor = client.commands.get(interaction.commandName)?.slashExecute;
	}

	if (!executor) {
		dataTransaction.finish();
		commandTransaction.finish();
		return;
	}

	const executeTransaction = commandTransaction.startChild({
		op: "command",
		description: "Execute the command with the fetched data",
	});

	try {
		await executor(client, interaction, serverDoc);
	} catch (error) {
		captureException(error);

		const embed = new Discord.EmbedBuilder()
			.setColor(0x000000)
			.setDescription(
				"An error was encountered while executing this command. The issue has been reported to the Singularity Team. We are sorry for the inconvenience.",
			);
		await interaction.editReply({
			embeds: [embed],
		});
	}

	executeTransaction.finish();
	commandTransaction.finish();
};

export default handler;
