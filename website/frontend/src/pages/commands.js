import React, { Component } from 'react';

import Command from '../components/command.js';

class Commands extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      cmd: 'none'
    }
    
    this.commands = {
      'General Commands': [{
        name: 'bestmcseed',
        type: 'General',
        aliases: [],
        args: [['']],
        examples: ['bestmcseed'],
        description: 'Displays the best seed in Minecraft Bedrock Edition'
      }, {
        name: 'command',
        type:'General',
        aliases: ['cmd'],
        args: [['<command_name>']],
        examples: ['command reactionrole'],
        description: 'Displays information about the mentioned command'
      }, {
        name: 'credits',
        type: 'General',
        aliases: [],
        args: [['']],
        examples: ['credits'],
        description: 'Displays the credits to the makers of this bot'
      }, {
        name: 'h',
        type: 'General',
        aliases: [],
        args: [['']],
        examples: ['h'],
        description: 'h'
      }, {
        name: 'help',
        type: 'General',
        aliases: [],
        args: [[''], ['<command_type>']],
        examples: ['help', 'help general'],
        description: 'Singularity Help'
      }, {
        name: 'invite',
        type: 'General',
        aliases: [],
        args: [['']],
        examples: ['invite'],
        description: 'Invite link for Singularity'
      }, {
        name: 'ping',
        type: 'General',
        aliases: [],
        args: [['']],
        examples: ['ping'],
        description: 'Responds with the bot\'s latency and the API latency'
      }, {
        name: 'say',
        type: 'General',
        aliases: [],
        args: [['<message>']],
        examples: ['say I am Singularity!'],
        description: 'The bot repeats the provided message'
      }],
      'Moderation Commands': [{
        name: 'clear',
        type: 'Moderation',
        aliases: [],
        args: [['<number of messages>']],
        examples: ['clear 100'],
        description: 'Clears the specified number of messages'
      }, {
        name: 'kick',
        type: 'Moderation',
        aliases: [],
        args: [['<@user to kick>']],
        examples: ['kick @Rule Breaker'],
        description: 'Kicks the mentioned user'
      }, {
        name: 'mute',
        type: 'Moderation',
        aliases: [],
        args: [['<@user to mute>']],
        examples: ['mute @Rule Breaker'],
        description: 'Mutes the mentioned user'
      }, {
        name: 'nickname',
        type: 'Moderation',
        aliases: [],
        args: [['<@user to remove nickname>'], ['<@user to nickname>', '<new nickname>'], ['<Singularity\'s new nickname>']],
        examples: ['nickname @Nicknamed', 'nickname @NotNicknamed Nicknamed', 'nickname Bot Named Singularity'],
        description: 'Sets the mentioned user\'s nickname to the specified nickname'
      }, {
        name: 'reactionrole',
        type: 'Moderation',
        aliases: ['rr'],
        args: [['<emoji>', '<role name>', '<message to send>']], 
        examples: ['reactionrole ⏰ Notify React to get the Notify role!'],
        description: 'Creates a new reaction role'
      }, {
        name: 'settings',
        type: 'Moderation',
        aliases: [],
        args: [[''], ['<settings type>'], ['<settings type>', '<setting>']],
        examples: ['settings', 'settings bot', 'settings bot prefix ?'],
        description: 'Singularity Settings'
      }, {
        name: 'ban',
        type: 'Moderation',
        aliases: [],
        args: [['<@user to ban>'], ['<@user to ban>', '<number of days>'], ['<@user to ban>', '<number of days>', '<reason>'], ['<@user to ban>', '<reason>']],
        examples: ['ban @RuleBreaker', 'ban @RuleBreaker 14', 'ban @RuleBreaker 14 Breaking the rules', 'ban @RuleBreaker Breaking the rules'],
        description: 'Bans the mentioned user'
      }, {
        name: 'unban',
        type: 'Moderation',
        aliases: [],
        args: [['<user#tag to unban>'], ['<user#tag to unban>', '<reason>']],
        examples: ['unban RuleBreaker#6969', 'unban RuleBreaker#6969 His time is up'],
        description: 'Unbans the mentioned user'
      }, {
        name: 'unmute',
        type: 'Moderation',
        aliases: [],
        args: [['<@user to unmute>']],
        examples: ['unmute @I\'mMuted'],
        description: 'Unmutes the mentioned user'
      }],
      'My Singularity Commands': [{
        name: 'mysingularity',
        type: 'My Singularity',
        aliases: ['ms'],
        args: [['']],
        examples: ['mysingularity'],
        description: 'Provides information about My Singularity'
      }, {
        name: 'singularity',
        type: 'My Singularity',
        aliases: ['s'],
        args: [[''], ['<@user to view profile of>'], ['shop'], ['shop', '<buy | sell>', '<item name>'], ['upgrade']],
        examples: ['singularity', 'singularity @Friend', 'singularity shop', 'singularity shop buy trophy', 'singularity shop sell trophy', 'singularity upgrade'],
        description: 'Manage your Singularity and view the Singularities of others!'
      }]
    }

    this.showCmd = this.showCmd.bind(this);
    this.cmdList = this.cmdList.bind(this);
  }
  
  showCmd(){
    return <><br/><Command cmd={this.state.cmd} /></>
  }
  
  cmdList(){
    return Object.entries(this.commands).map(currentGrp => {
      return (
        <div>
          <h2>{currentGrp[0]}</h2>
          <hr/>
          {
            currentGrp[1].map(currentCmd => {
              return (
                <>
                <button onClick={() => {this.setState({
                                                        cmd: currentCmd
                                                      } )}}>{currentCmd.name}</button><br/>
                </>
              )
            })
          }
        </div>
      )
    });
  }
  
  render(){
    return(
      <main id="sidebar-main">
        <div id="cmd-sidebar">
          {this.cmdList()}
        </div>
        <div id="command">
          {this.showCmd()}
        </div>
      </main>
    )
  }
}

export default Commands;