import React, { Component } from "react";

import Command from "../components/command.jsx";

class Commands extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cmd: "none",
		};

		this.commands = {
			"General Commands": [
				{
					name: "command",
					type: "General",
					aliases: ["cmd"],
					args: [["<command_name>"]],
					examples: ["command reactionrole"],
					description: "Displays information about the mentioned command",
				},
				{
					name: "credits",
					type: "General",
					aliases: [],
					args: [[""]],
					examples: ["credits"],
					description: "Displays the credits to the makers of this bot",
				},
				{
					name: "help",
					type: "General",
					aliases: [],
					args: [[""], ["<command_type>"]],
					examples: ["help", "help general"],
					description: "Singularity Help",
				},
				{
					name: "links",
					type: "General",
					aliases: [],
					args: [[""]],
					examples: ["links"],
					description: "Various links for Singularity",
				},
				{
					name: "ping",
					type: "General",
					aliases: [],
					args: [[""]],
					examples: ["ping"],
					description: "Responds with the bot's latency and the API latency",
				},
				{
					name: "say",
					type: "General",
					aliases: [],
					args: [["<message>"]],
					examples: ["say I am Singularity!"],
					description: "The bot repeats the provided message",
				},
				{
					name: "stats",
					type: "General",
					aliases: [],
					args: [["<stats type>", "<stats sub type>"]],
					examples: [
						"stats server overview",
						"stats server mysingularity",
						"stats bot overview",
					],
					description:
						"Displays statistics about Singularity and the current server",
					subGrps: [
						{
							name: "bot",
							subCmds: [
								{
									name: "overview",
								},
							],
						},
						{
							name: "server",
							subCmds: [
								{
									name: "overview",
								},
								{
									name: "mysingularity",
								},
							],
						},
					],
				},
			],
			"Moderation Commands": [
				{
					name: "ban",
					type: "Moderation",
					aliases: [],
					args: [
						["<@user to ban>"],
						["<@user to ban>", "<number of days>"],
						["<@user to ban>", "<number of days>", "<reason>"],
						["<@user to ban>", "<reason>"],
					],
					examples: [
						"ban @RuleBreaker",
						"ban @RuleBreaker 14",
						"ban @RuleBreaker 14 Breaking the rules",
						"ban @RuleBreaker Breaking the rules",
					],
					description: "Bans the mentioned user",
				},
				{
					name: "clear",
					type: "Moderation",
					aliases: [],
					args: [["<number of messages>"]],
					examples: ["clear 100"],
					description: "Clears the specified number of messages",
				},
				{
					name: "kick",
					type: "Moderation",
					aliases: [],
					args: [["<@user to kick>"]],
					examples: ["kick @Rule Breaker"],
					description: "Kicks the mentioned user",
				},
				{
					name: "mute",
					type: "Moderation",
					aliases: [],
					args: [["<@user to mute>"]],
					examples: ["mute @Rule Breaker"],
					description: "Mutes the mentioned user",
				},
				{
					name: "nickname",
					type: "Moderation",
					aliases: [],
					args: [
						["<@user to remove nickname>"],
						["<@user to nickname>", "<new nickname>"],
						["<Singularity's new nickname>"],
					],
					examples: [
						"nickname @Nicknamed",
						"nickname @NotNicknamed Nicknamed",
						"nickname Bot Named Singularity",
					],
					description:
						"Sets the mentioned user's nickname to the specified nickname",
				},
				{
					name: "reactionrole",
					type: "Moderation",
					aliases: ["rr"],
					args: [["<emoji>", "<role name>", "<message to send>"]],
					examples: ["reactionrole ⏰ Notify React to get the Notify role!"],
					description: "Creates a new reaction role",
				},
				{
					name: "settings",
					type: "Moderation",
					aliases: [],
					args: [[""], ["<settings type>"], ["<settings type>", "<setting>"]],
					examples: ["settings", "settings bot", "settings bot prefix ?"],
					description: "Singularity Settings",
					subGrps: [
						{
							name: "bot",
							subCmds: [
								{
									name: "help",
								},
								{
									name: "kick",
								},
								{
									name: "prefix",
								},
							],
						},
						{
							name: "server",
							subCmds: [
								{
									name: "help",
								},
								{
									name: "leavemessage",
								},
								{
									name: "welcomemessage",
								},
							],
						},
						{
							name: "mod",
							subCmds: [
								{
									name: "help",
								},
							],
						},
					],
				},
				{
					name: "unban",
					type: "Moderation",
					aliases: [],
					args: [["<user#tag to unban>"], ["<user#tag to unban>", "<reason>"]],
					examples: [
						"unban RuleBreaker#6969",
						"unban RuleBreaker#6969 His time is up",
					],
					description: "Unbans the mentioned user",
				},
				{
					name: "unmute",
					type: "Moderation",
					aliases: [],
					args: [["<@user to unmute>"]],
					examples: ["unmute @I'mMuted"],
					description: "Unmutes the mentioned user",
				},
			],
			"My Singularity Commands": [
				{
					name: "mysingularity",
					type: "My Singularity",
					aliases: ["ms"],
					args: [
						[""],
						["<@user to view profile of>"],
						["shop"],
						["shop", "<buy | sell>", "<item name>"],
						["upgrade"],
						["info"],
					],
					examples: [
						"singularity",
						"singularity @Friend",
						"singularity shop",
						"singularity shop buy trophy",
						"singularity shop sell trophy",
						"singularity upgrade",
					],
					description:
						"Manage your Singularity and view the Singularities of others!",
					subGrps: [
						{
							name: "mod",
							subCmds: [
								{
									name: "help",
								},
								{
									name: "set",
								},
							],
						},
						{
							name: "shop",
							subCmds: [
								{
									name: "buy",
								},
								{
									name: "sell",
								},
								{
									name: "view",
								},
							],
						},
					],
					subCmds: [
						{
							name: "info",
						},
						{
							name: "prestige",
						},
						{
							name: "rare",
						},
						{
							name: "upgrade",
						},
						{
							name: "use",
						},
						{
							name: "view",
						},
					],
				},
			],
		};

		this.showCmd = this.showCmd.bind(this);
		this.cmdList = this.cmdList.bind(this);
	}

	showCmd() {
		return (
			<>
				<br />
				<Command cmd={this.state.cmd} />
			</>
		);
	}

	cmdList() {
		return Object.entries(this.commands).map((currentGrp) => {
			return (
				<div>
					<h2>{currentGrp[0]}</h2>
					<hr />
					{currentGrp[1].map((currentCmd) => {
						return (
							<>
								<button
									onClick={() => {
										this.setState({
											cmd: currentCmd,
										});
									}}
								>
									{currentCmd.name}
								</button>
								<br />
							</>
						);
					})}
				</div>
			);
		});
	}

	render() {
		return (
			<main className="sidebar-wrapper">
				<div className="sidebar">{this.cmdList()}</div>
				<div className="sidebar-content">{this.showCmd()}</div>
			</main>
		);
	}
}

export default Commands;
