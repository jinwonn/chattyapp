import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className="messages">
      {this.props.messages.map(message => {
      return <Message username={message.username} content = {message.content} key = {message.key}/>
      })}
  
</main>
    );
  }
}
export default MessageList;