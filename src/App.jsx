import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true,
                  currentmessageid: 2,
                  messages: []
                };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001/')
    this.socket.onopen = (con) => {console.log('Connected to server')}
    console.log(this.socket)

    this.setState({loading: false});
    
    setTimeout(() => {
      const newMessage = {key: 1, username: "ChattyBot", content: "Hello there! Has anyone seen my marbles? Please enter your name and start chatting away!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 1500);
}
  _sendMessage = (message) => {
    this.socket.send(JSON.stringify(message))
    console.log(this.socket)
    console.log("sent", message)

  }

  _newMessage = (message) => {
    let id = this.state.currentmessageid;
    if (message.username) {
        var newMessage = {username: message.username, content: message.message, key: id++}
      } else {
        var newMessage = {username: "Anonymous", content: message.message, key: id++}
      }
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages, currentmessageid: id})
  }
 
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} onSend = {this._sendMessage}/>
      </div>
    );

  }
}
export default App;
