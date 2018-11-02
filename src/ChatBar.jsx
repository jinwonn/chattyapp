import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {message: "", 
                  username: "",
                  oldusername: "Anonymous"}; 
  }

  _postMessage = (e) => {
    if (e.key === 'Enter') {
      const postMessage = {
        type: "postMessage",
        username: this.state.username,
        message: this.state.message,
      };
      this.props.onSend(postMessage)
      this.setState({message: ""});
    }
  }
  _postNotification = () => {
    if (this.state.username !== this.state.oldusername) {
      if (!(this.state.username === "" && this.state.oldusername === "Anonymous")) {
      // } else {
        if (this.state.username === "") {
          const postNotification = {
            type: "postNotification",
            username: "Anonymous",
            message: this.state.oldusername + " is now Anonymous"
            }
            this.props.onSend(postNotification);
            this.setState({oldusername: "Anonymous"});
        } else {
          const postNotification = {
          type: "postNotification",
          username: this.state.username,
          message: this.state.oldusername + " changed their name to " + this.state.username
          }
          this.props.onSend(postNotification);
          this.setState({oldusername: this.state.username});
        }
      }
    }
  
      // const postNotification = {
      // type: "postNotification",
      // username: this.state.username,
      // message: this.state.oldusername + " changed their name to " + this.state.username
      // }
    // this.props.onSend(postNotification);
    // this.setState({oldusername: this.state.username});
  }
  _onEnter = (e) => {
    if (e.key === 'Enter') {
      this._postNotification()
    }
  };

  _onBlur = () => {
    if (!this.state.focus) {
      this._postNotification()
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.username}
           onChange={(e) => {
             this.setState({username: e.target.value});
           }}
           onKeyPress={this._onEnter} onBlur={this._onBlur}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} 
           onChange={(e) => {
             this.setState({message: e.target.value});
           }}
           onKeyPress={this._postMessage}/>
      </footer>
    );
  }
}
export default ChatBar;