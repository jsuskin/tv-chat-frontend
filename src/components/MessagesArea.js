import React, { Component } from 'react';
import NewMessageForm from './NewMessageForm';

class MessagesArea extends Component {
  state = {
    conversation: this.props.conversation,
    token: this.props.token
  }

  componentWillReceiveProps({ conversation }) {
    this.setState({...this.state, conversation})
  }

  render() {
    const { id, title, messages } = this.state.conversation
    return (
      <div className="messages-area">
        <h2>{title}</h2>
        <ul>{orderedMessages(messages)}</ul>
        <NewMessageForm conversation_id={id} token={this.state.token} />
      </div>
    );
  }
}

export default MessagesArea;

const orderedMessages = messages => {
  const sortedMessages = messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.text}</li>
  });
}
