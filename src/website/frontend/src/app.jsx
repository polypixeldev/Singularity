import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";

import Home from "./pages/home.jsx";
import Commands from "./pages/commands.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Login from "./pages/login.jsx";
import NotFound from "./pages/notfound.jsx";

import Seo from "./seo.jsx";

import "./app.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userInfo: null,
		};

		this.checkLogin = this.checkLogin.bind(this);
		this.setUser = this.setUser.bind(this);
	}

	checkLogin() {
		if (this.state.userInfo) {
			return (
				<div className="side-by-side">
					<img
						className="icon"
						src={`data:image/png;base64,${this.state.userInfo.avatar}`}
						alt="Your Discord Profile Picture"
					/>
					<Link className="nav-links" to="/dashboard">
						Dashboard
					</Link>
				</div>
			);
		} else {
			return (
				<>
					<Link to="/login" className="nav-links">
						Login
					</Link>
				</>
			);
		}
	}

	setUser(user) {
		this.setState({
			userInfo: user,
		});
	}

	render() {
		return (
			<>
				<Seo />
				<nav>
					<Link className="nav-links" to="/" id="h1">
						SINGULARITY
					</Link>
					<div id="nav-div" className="side-by-side" style={{ width: "50%" }}>
						<a
							id="inv-link"
							className="nav-links"
							href="https://discord.com/oauth2/authorize?client_id=835256019336036423&permissions=261993005047&redirect_uri=https%3A%2F%2Fsingularitybot.glitch.me%2Flogin&scope=applications.commands%20bot"
							target="_blank"
						>
							Invite
						</a>

						<Link id="cmd-link" className="nav-links" to="/commands">
							Commands
						</Link>

						<div id="dash-link">{this.checkLogin()}</div>
					</div>
					<div className="dropdown">
						<img
							className="dropbtn"
							src="https://cdn.glitch.com/7443647b-611c-42f0-93fa-477dbbcd12cf%2Fdropdown.png?v=1624287338891"
							alt="dropdown icon"
						/>

						<div className="dropdown-content">
							<Link to={this.state.userInfo ? "/dashboard" : "/login"}>
								{this.state.userInfo ? "Dashboard" : "Login"}
							</Link>
							<Link to="/commands">Commands</Link>
							<Link
								to="https://discord.com/oauth2/authorize?client_id=835256019336036423&permissions=261993005047&redirect_uri=https%3A%2F%2Fsingularitybot.glitch.me%2Flogin&scope=applications.commands%20bot"
								target="_blank"
							>
								Invite
							</Link>
						</div>
					</div>
				</nav>
				<Switch>
					<Route exact path="/" render={(props) => <Home />} />
					<Route path="/commands" render={(props) => <Commands />} />
					<Route
						path="/dashboard"
						render={(props) => (
							<Dashboard
								userInfo={this.state.userInfo}
								setUser={this.setUser}
							/>
						)}
					/>
					<Route
						path="/login"
						render={(props) => (
							<Login
								{...props}
								userInfo={this.state.userInfo}
								setUser={this.setUser}
							/>
						)}
					/>
					<Route path="/" render={(props) => <NotFound {...props} />} />
				</Switch>
				<footer className="equal-grid-3">
					<img
						className="tiny-img"
						alt="Singularity Icon"
						src="https://cdn.glitch.com/7443647b-611c-42f0-93fa-477dbbcd12cf%2FcircleSingularity.png?v=1629059927336"
					/>
					<p>Made by poly#3622 and Redstone#1165</p>
					<div className="v-links">
						<a href="/commands">Commands</a>
						<a href="/dashboard">Dashboard</a>
					</div>
				</footer>
			</>
		);
	}
}

export default App;
