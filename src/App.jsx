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
    // console.log(this.socket)

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
    var newMessage = {username: message.username, 
                      content: message.message, 
                      key: message.id,
                      type: "message"}
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    console.log(this.state.messages)
  }

  _newNotification = (message) => {
    var newMessage = {username: message.username, 
                      content: message.message, 
                      key: message.id,
                      type: "notification"}
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
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
