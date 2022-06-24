import React, { Component } from "react";

class Home extends Component {
	render() {
		return (
			<main>
				<section className="top equal-grid-pair">
					<img
						alt="Singularity Icon"
						src="https://cdn.glitch.com/7443647b-611c-42f0-93fa-477dbbcd12cf%2FcircleSingularity.png?v=1629059927336"
					/>
					<div className="blurple-box">
						<h2>One Bot. Everything you need.</h2>
						<br />
						<div className="pretty-link">
							<a href="https://discord.com/api/oauth2/authorize?client_id=835256019336036423&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds">
								<em>Get Started with Singularity</em>
							</a>
						</div>
					</div>
				</section>
				<section>
					<p>
						Singularity is the best choice for your Discord server, whether it's
						just a small server for your friends, or a server for a huge
						community. Every feature you could possibly want for your server is
						at your fingertips - <strong>for free.</strong> No tricks or bait
						luring you into taking out your wallet for a good time with your
						friends. It's as simple as Singularity.
					</p>
				</section>
			</main>
		);
	}
}

export default Home;
