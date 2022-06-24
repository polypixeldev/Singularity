import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			err: false,
		};
	}

	render() {
		console.log(this.props.userInfo);
		let queries = {};
		let str = window.location.hash.split("#")[1];
		if (str) {
			let arr = str.split("&");
			for (let prop of arr) {
				let split = prop.split("=");
				queries[split[0]] = split[1];
			}
		}
		if (this.props.userInfo) {
			console.log(this.props.userInfo);
			window.location.path = "/dashboard";
			return <Redirect to="/dashboard" />;
		} else if (queries.access_token) {
			if (this.state.err === false) {
				console.log("Requesting the API...");
				axios
					.get("http://localhost:5000/api/userinfo", {
						params: {
							token: queries.access_token,
						},
					})
					.then((res) => {
						if (res.data.code !== 0) {
							this.setState({
								err: {
									name: "Error Code",
									message: `API Responded with code ${res.data.code}`,
								},
							});
						}
						this.props.setUser({
							token: queries.access_token,
							...res.data.data,
						});
						window.location.path = "/dashboard";
					})
					.catch((err) => {
						this.setState({
							err: err,
						});
					});

				return (
					<main>
						<section className="top">
							<h2 style={{ marginTop: "0px", paddingTop: "40vh" }}>
								Fetching your data from the depths of space...
							</h2>
						</section>
					</main>
				);
			} else {
				return (
					<main>
						<section className="top" style={{ background: "#23272A" }}>
							<h2 style={{ marginTop: "0px", paddingTop: "5vh" }}>Uh oh...</h2>
							<p>
								There's a glitch in the Singularity! An error occured while
								fetching your data. Try reloading this page. If the problem
								persists, please report the issue to the Singularity Support
								server with the following message:{" "}
							</p>
							<code>
								{this.state.err.name}
								<br />
								<br />
								{this.state.err.message}
							</code>
						</section>
					</main>
				);
			}
		} else {
			console.log("a");
			window.location.assign(
				"https://discord.com/api/oauth2/authorize?client_id=835256019336036423&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Flogin&response_type=token&scope=identify%20guilds"
			);

			return (
				<main>
					<h2>Hmmm...</h2>
					<p>
						If you're reading this for longer than a second, it means something
						went wrong. You should've been redirected to login with your Discord
						account, but apparently that didn't happen. Try{" "}
						<a href="/login">reloading</a>.
					</p>
				</main>
			);
		}
	}
}

export default Login;
