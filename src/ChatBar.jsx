import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ""} 
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
    this.props.onSend(this.state)
    this.setState({message: ""});
    }
  }
  
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.username}
           onChange={(e) => {
             this.setState({username: e.target.value});
            //  console.log(this.state)
           }}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} 
           onChange={(e) => {
             this.setState({message: e.target.value});
            //  console.log(this.state)
           }}
           onKeyPress={this._handleKeyPress}/>
      </footer>
    );
  }
}
export default ChatBar;