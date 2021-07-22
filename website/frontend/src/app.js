import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Home from "./pages/home.js";
import Commands from "./pages/commands.js";
import Dashboard from "./pages/dashboard.js";
import Login from "./pages/login.js"

import Seo from "./seo.js";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null
    };
  }

  checkLogin() {
    if (this.state.userInfo) {
      return (
        <>
          <img id="pfp" alt="Your Discord Profile Picture" />
          <Link className="nav-links" to="/dashboard">
            Dashboard
          </Link>
        </>
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

  componentDidMount() {}

  render() {
    return (
      <>
        <Seo />
        <nav>
          <Link className="nav-links" to="/" id="h1">
            SINGULARITY
          </Link>
          <div id="nav-div" className="side-by-side">
            <a
              id="inv-link"
              className="nav-links"
              href="https://discord.com/oauth2/authorize?client_id=835256019336036423&scope=bot&permissions=8"
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
              <Link to={this.state.userInfo ? "/dashboard" : '/login'}>
                {this.state.userInfo ? "Dashboard" : "Login"}
              </Link>
              <Link to="/commands">Commands</Link>
              <Link
                to="https://discord.com/oauth2/authorize?client_id=835256019336036423&scope=bot&permissions=8"
                target="_blank"
              >
                Invite
              </Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" render={props => <Home />} />
          <Route path="/commands" render={props => <Commands />} />
          <Route
            path="/dashboard"
            render={props => <Dashboard userInfo={this.state.userInfo} />}
          />
          <Route path="/login" render={props => <Login {...props} userInfo={this.state.userInfo}  />} />
        </Switch>
        <footer className="equal-grid-3">
          <img className="tiny-img" alt="Singularity Icon" src="https://cdn.glitch.com/7443647b-611c-42f0-93fa-477dbbcd12cf%2Fsingularity.png?v=1626896892268" />
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
