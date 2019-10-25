import React, { Component } from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewConversationForm extends Component {
  state = {
    title: ''
  }

  handleChange = e => {
    this.setState({ title: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.props.token}`
      },
      body: JSON.stringify(this.state)
    });
    this.setState({ title: '' });
  }

  render() {
    return (
      <div className="new-conversation-form">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default NewConversationForm;
