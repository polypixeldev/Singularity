import React, { Component } from "react";
import axios from 'axios';

class Login extends Component {
  componentDidMount(){
    
  }
  
  render() {
    let queries = {}
    let str = window.location.hash.split('#')[1];
    if(str){
      let arr = str.split('&');
      for(let prop of arr){
        let split = prop.split('=')
        queries[split[0]] = split[1]
      }
      console.log(queries);
    }
    if(this.props.userInfo){
      window.location.path = '/dashboard';
      return (
      <main>
        <h2>Hmmm...</h2>
        <p>If you're reading this for longer than a second, it means something went wrong. You should've been redirected to login with your Discord account, but apparently that didn't happen. Try <a href="/login">reloading</a>.</p>
      </main>
    );
    } else if(queries.access_token){
      axios.get('https://discord.com/api/users/@me', {
        params: {
          token: queries.access_token
        }
      })
      return (
      <main>
          <section id="top">
            <h2 style={{marginTop: '0px', paddingTop: '40vh'}}>Fetching your data from the depths of space...</h2> 
          </section>
      </main>
    );
    } else {
    window.location.assign('https://discord.com/api/oauth2/authorize?client_id=835256019336036423&redirect_uri=https%3A%2F%2Fsingularitybot.glitch.me%2Flogin&response_type=token&scope=identify%20guilds'); 
    
    return (
      <main>
        <h2>Hmmm...</h2>
        <p>If you're reading this for longer than a second, it means something went wrong. You should've been redirected to login with your Discord account, but apparently that didn't happen. Try <a href="/login">reloading</a>.</p>
      </main>
    );
    }
  }
}

export default Login;
