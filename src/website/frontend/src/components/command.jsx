import React, { Component } from "react";

class Command extends Component {
	constructor(props) {
		super(props);

		this.command = this.command.bind(this);
	}

	command() {
		//
		if (this.props.cmd === "none") {
			return (
				<>
					<code className="info">Please select a command on the left</code>
				</>
			);
		} else {
			let usageStr = "";
			for (let variant of this.props.cmd.args) {
				usageStr = usageStr + `\n ${this.props.cmd.name}${variant.join(" ")}`;
			}
			return (
				<>
					<div className="cmd-div">
						<h2>{this.props.cmd.name}</h2>
						<p>{this.props.cmd.type} Command</p>
					</div>
					{this.props.cmd.aliases.length !== 0 ? (
						<p>
							A.K.A. <code>{this.props.cmd.aliases.join(", ")}</code>
						</p>
					) : (
						<></>
					)}
					<br />
					<div className="cmd-div">
						<p>{this.props.cmd.description}</p>
					</div>
					<hr />
					<h2>Usage:</h2>
					<br />
					{this.props.cmd.args.map((currentVariant) => {
						return (
							<>
								<code>
									{this.props.cmd.name} {currentVariant.join(" ")}
								</code>
								<br />
								<br />
							</>
						);
					})}
					<hr />
					<h2>Examples:</h2>
					{this.props.cmd.examples.map((currentEx) => (
						<>
							<code>{currentEx}</code>
							<br />
							<br />
						</>
					))}
					<hr />
					<h2>Subcommand Groups</h2>
					{this.props.cmd.subGrps?.map((currentGrp) => (
						<>
							<code>{currentGrp.name}:</code>
							<br />
							{currentGrp.subCmds.map((currentCmd) => (
								<>
									<br />
									<p style={{ textAlign: "center" }}>{currentCmd.name}</p>
								</>
							))}
							<br />
						</>
					))}
					<hr />
					<h2>Subcommands</h2>
					{this.props.cmd.subCmds?.map((currentCmd) => (
						<>
							<br />
							<br />
							<code>{currentCmd.name}</code>
						</>
					))}
				</>
			);
		}
	}

	render() {
		return <>{this.command()}</>;
	}
}

export default Command;
