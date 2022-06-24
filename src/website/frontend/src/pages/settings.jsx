import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			prefix: "",
			nickname: "",
			welcomeMessage: "",
			leaveMessage: "",
		};

		this.handleRemove = this.handleRemove.bind(this);
		this.handlePrefixSubmit = this.handlePrefixSubmit.bind(this);
		this.handleNicknameSubmit = this.handleNicknameSubmit.bind(this);
		this.handleWelcomeMessageSubmit =
			this.handleWelcomeMessageSubmit.bind(this);
		this.handleLeaveMessageSubmit = this.handleLeaveMessageSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			prefix: this.props.data.data.prefix,
			nickname: this.props.data.nickname,
			welcomeMessage: this.props.data.data.welcomeMessage,
			leaveMessage: this.props.data.data.leaveMessage,
		});
	}

	handlePrefixSubmit(event) {
		event.preventDefault();

		axios
			.post("http://localhost:5000/api/updateGuild", {
				token: this.props.userInfo.token,
				guildID: this.props.data.id,
				data: {
					prefix: this.state.prefix,
				},
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleNicknameSubmit(event) {
		event.preventDefault();

		axios
			.post("http://localhost:5000/api/nickname", {
				token: this.props.userInfo.token,
				guildID: this.props.data.id,
				nickname: this.state.nickname,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleWelcomeMessageSubmit(event) {
		event.preventDefault();

		axios
			.post("http://localhost:5000/api/updateGuild", {
				token: this.props.userInfo.token,
				guildID: this.props.data.id,
				data: {
					welcomeMessage: this.state.welcomeMessage,
				},
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleLeaveMessageSubmit(event) {
		event.preventDefault();

		axios
			.post("http://localhost:5000/api/updateGuild", {
				token: this.props.userInfo.token,
				guildID: this.props.data.id,
				data: {
					leaveMessage: this.state.leaveMessage,
				},
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		console.log(value);
		this.setState({
			[name]: value,
		});
	}

	handleRemove() {
		axios
			.post("http://localhost:5000/api/remove", {
				token: this.props.userInfo.token,
				guildID: this.props.data.id,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		console.log(this.props.data);

		if (!this.props.data.manageable) {
			return <Redirect to="/dashboard" />;
		}

		return (
			<div className="sidebar-content flex-vertical">
				<h2>{this.props.data.name} - Settings</h2>
				<hr style={{ width: "75%" }} />
				<h3>Bot Settings</h3>
				<form onSubmit={this.handlePrefixSubmit}>
					<label htmlFor="prefix">Prefix: </label>
					<input
						name="prefix"
						type="text"
						onChange={this.handleChange}
						value={this.state.prefix}
					/>
					<input type="submit" />
				</form>
				<br />
				<form onSubmit={this.handleNicknameSubmit}>
					<label htmlFor="nickname">Nickname: </label>
					<input
						name="nickname"
						type="text"
						onChange={this.handleChange}
						value={this.state.nickname}
					/>
					<input type="submit" />
				</form>
				<br />
				<button
					className="button"
					style={{ backgroundColor: "red", padding: "2vh 2vw 2vh 2vw" }}
					onClick={this.handleRemove}
				>
					Remove Singularity
				</button>
				<br />
				<h3>Server Settings</h3>
				<form onSubmit={this.handleWelcomeMessageSubmit}>
					<label htmlFor="welcomeMessage">Welcome Message: </label>
					<input
						name="welcomeMessage"
						type="text"
						onChange={this.handleChange}
						value={this.state.welcomeMessage}
					/>
					<input type="submit" />
				</form>
				<br />
				<form onSubmit={this.handleLeaveMessageSubmit}>
					<label htmlFor="leaveMessage">Leave Message: </label>
					<input
						name="leaveMessage"
						type="text"
						onChange={this.handleChange}
						value={this.state.leaveMessage}
					/>
					<input type="submit" />
				</form>
				<br />
				<h3>Moderation Settings</h3>
				<br />
			</div>
		);
	}
}

export default Settings;
