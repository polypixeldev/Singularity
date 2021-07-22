import React, { Component } from 'react';

class Home extends Component {
  render(){
    return(
      <main>
        <section id="top" className="equal-grid-pair">
          <img alt="Singularity Icon" src="https://cdn.glitch.com/7443647b-611c-42f0-93fa-477dbbcd12cf%2Fsingularity.png?v=1626896892268" />
          <div className="blurple-box">
            <h2>One Bot. Everything you need.</h2>
            <br/>
            <div className="pretty-link" >
              <a href="https://discord.com/oauth2/authorize?client_id=835256019336036423&scope=bot&permissions=8"><em>Get Started with Singularity</em></a>
            </div>
          </div>
        </section>
        <section>
          <p>Singularity is the best choice for your Discord server, whether it's just a small server for your friends, or a server for a huge community. Every feature you could possibly want for your server is at your fingertips - <strong>for free.</strong> No tricks or bait luring you into taking out your wallet for a good time with your friends. It's as simple as Singularity.</p>
        </section>
      </main>
    )
  }
}

export default Home;