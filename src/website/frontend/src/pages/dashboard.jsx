import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Settings from "./settings.jsx";
import Features from "./features.jsx";

import Guild from "../components/guild.jsx";

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			guild: null,
		};

		this.listGuilds = this.listGuilds.bind(this);
		this.loadGuild = this.loadGuild.bind(this);
	}

	listGuilds() {
		return this.props.userInfo.guilds.map((guild) => {
			return (
				<div key={guild.id}>
					<button
						onClick={() => {
							this.setState({
								guild: guild.id,
							});
						}}
					>
						<div className="side-by-side">
							{(() => {
								if (guild.icon) {
									return (
										<img
											className="icon"
											src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
											alt={`${guild.name}'s Icon`}
										/>
									);
								}
							})()}
							<strong>{guild.name}</strong>
						</div>
					</button>
					<br />
				</div>
			);
		});
	}

	loadGuild() {
		if (this.state.guild === null) {
			return (
				<div className="sidebar-content flex-vertical">
					<h2>Please choose a server on the left</h2>
				</div>
			);
		} else if (
			this.props.userInfo.guilds.find((guild) => guild.id === this.state.guild)
				.available === false
		) {
			if (
				this.props.userInfo.guilds.find(
					(guild) => guild.id === this.state.guild
				).manageable === false
			) {
				return (
					<div className="sidebar-content flex-vertical">
						<p style={{ textAlign: "center" }}>
							Unfortunately, it appears that you have insufficient permissions
							to use Singularity in this server. Contact the server owner or a
							member with the "Manage Server" permission to start using
							Singularity!
						</p>
					</div>
				);
			} else {
				return (
					<div className="sidebar-content flex-vertical">
						<p style={{ textAlign: "center" }}>
							It seems that Singularity can't see your server, which means
							you're missing out on a lot of things. Click on the link below to
							boost your server today!
						</p>
						<div className="pretty-link">
							<a href="https://discord.com/api/oauth2/authorize?client_id=835256019336036423&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds">
								<em>Get Started with Singularity</em>
							</a>
						</div>
					</div>
				);
			}
		} else {
			return (
				<Guild
					data={this.props.userInfo.guilds.find(
						(val) => val.id === this.state.guild
					)}
				/>
			);
		}
	}

	render() {
		if (!this.props.userInfo) {
			this.props.setUser(null);
			return <Redirect to="/login" />;
		}

		return (
			<main>
				<div className="sidebar-wrapper">
					<div className="sidebar">{this.listGuilds()}</div>
					<Switch>
						<Route
							path="/dashboard/settings"
							render={(props) => (
								<Settings
									{...props}
									data={this.props.userInfo.guilds.find(
										(val) => val.id === this.state.guild
									)}
									userInfo={this.props.userInfo}
								/>
							)}
						/>
						<Route
							path="/dashboard/features"
							render={(props) => (
								<Features
									{...props}
									data={this.props.userInfo.guilds.find(
										(val) => val.id === this.state.guild
									)}
									userInfo={this.props.userInfo}
								/>
							)}
						/>
						<Route path="/dashboard" render={(props) => this.loadGuild()} />
					</Switch>
				</div>
			</main>
		);
	}
}

export default Dashboard;
