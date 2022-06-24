import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
	render() {
		return (
			<main className="top">
				<h2 style={{ marginTop: "0px", paddingTop: "30vh" }}>Uh oh...</h2>
				<p>
					It seems that you've crossed the event horizon of this webpage.{" "}
					<Link to="/">Click here to return before it's too late!</Link>
				</p>
			</main>
		);
	}
}

export default NotFound;
