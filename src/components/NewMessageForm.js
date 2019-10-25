import React from 'react';
import { API_ROOT, HEADERS } from '../constants'

class NewMessageForm extends React.Component {
  state = {
    text: '',
    conversation_id: this.props.conversation_id
  }

  componentWillReceiveProps({ conversation_id }) {
    this.setState({...this.state, conversation_id})
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.props.token}`
      },
      body: JSON.stringify(this.state)
    });
    this.setState({ text: '' })
  }

  render() {
    return (
      <div className="new-message-form">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }

}

export default NewMessageForm;
