import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
// import usersconnected from '../server.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true,
                  usersConnected: "",
                  messages: []
                };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001/')
    this.socket.onopen = (con) => {console.log('Connected to server')}

    this.setState({loading: false});

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Client recevied", data);
      switch(data.type) {
        case "incomingMessage":
          this._newMessage(data)
          break;
        case "incomingNotification":
          this._newNotification(data)
          break;
        case "incomingInfo":
          console.log("client received info:", data)
          this.setState({usersConnected: data.content})
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
    
    setTimeout(() => {
      const newMessage = {key: 1, 
                          username: "ChattyBot", 
                          content: "Hello there! Has anyone seen my marbles? Please enter your name and start chatting away!",
                          type: "message"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 1500);
  }
  
  _sendMessage = (message) => {
    this.socket.send(JSON.stringify(message))
    console.log(this.socket)
    console.log("Client send:", message)

  }
  
  _newMessage = (message) => {
    var type = "message"
    this._record(message, type)
  }

  _newNotification = (message) => {
    var type = "notification"
    this._record(message, type)
  }
  
  _record = (content, type) => {
    var newMessage = {username: content.username, 
      content: content.message, 
      key: content.id,
      type: type}
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }
 
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div id="users">{this.state.usersConnected} users connected</div>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} onSend = {this._sendMessage}/>
      </div>
    );

  }
}
export default App;
