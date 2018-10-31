import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true,
                  currentmessageid: 5,
                  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
                  messages: [
                    {
                      username: "Bob",
                      content: "Has anyone seen my marbles?",
                      key: 1
                    },
                    {
                      username: "Anonymous",
                      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
                      key: 2
                    }
                  ]};
  }

  componentDidMount() {
    this.setState({loading: false});
    //simulate incoming message
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {key: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 1000);

  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {key: 4, username: "Daniel", content: "Hello!"};
    const messages = this.state.messages.concat(newMessage)
    console.log(messages, "hardcoded")
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 2000);

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
    console.log(this.state)
}
 
  render() {
    return (
      <div>
      <nav className="navbar"><a href="/" className="navbar-brand">Chatty</a></nav>
      <MessageList messages = {this.state.messages}/>
      <ChatBar currentUser = {this.state.currentUser} onSend = {this._newMessage}/>
      </div>
    );

  }
}
export default App;
