import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm'
import MessagesArea from './MessagesArea'
import Cable from './Cable'

class ConversationsList extends Component {
  state = {
    conversations: [],
    activeConversation: null
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  }

  handleClick = id => {
    this.setState({activeConversation: id})
  }

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  }

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(conversation => conversation.id === message.conversation_id);
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  }

  render() {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversations-list">
        <ActionCable
          channel={{channel: 'ConversationsChannel'}}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length > 0 ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        <ul>{mapConversations(conversations, this.handleClick)}</ul>
        <NewConversationForm token={this.props.token} />
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations, activeConversation
            )}
            token={this.props.token}
          />
        ) : null}
      </div>
    );
  }

}

export default ConversationsList;

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(conversation => conversation.id === activeConversation);
}

const mapConversations = (conversations, handleClick) => {
  // debugger
  return conversations.length ? conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.title}
      </li>
    )
  }) : null
}
