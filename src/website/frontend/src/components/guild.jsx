import React, { Component } from "react";
import { Link } from "react-router-dom";

import SettingsIcon from "../media/settings.png";
import FeaturesIcon from "../media/features.png";

class Guild extends Component {
	render() {
		return (
			<div className="sidebar-content flex-vertical">
				<div className="side-by-side">
					<img
						className="icon"
						src={`https://cdn.discordapp.com/icons/${this.props.data.id}/${this.props.data.icon}`}
						alt={`${this.props.data.name}'s Icon`}
					/>
					<h2>{this.props.data.name}</h2>
				</div>
				<div className="pretty-link">
					<a href={`/${this.props.data.id}/leaderboard`}>Leaderboard</a>
				</div>
				<br />
				<div className="side-by-side">
					<Link className="button flex-vertical" to="/dashboard/settings">
						<img className="tiny-img" src={SettingsIcon} />
						<p>Settings</p>
					</Link>
					<Link className="button flex-vertical" to="/dashboard/features">
						<img className="tiny-img" src={FeaturesIcon} />
						<p>Features</p>
					</Link>
				</div>
			</div>
		);
	}
}

export default Guild;
