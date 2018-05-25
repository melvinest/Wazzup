import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Chat from './chat';
import Header from './header';
import Textbox from './textbox';
import Messages from '../api/messages';
import Avatars from '../api/avatars';

class Chatbox extends Component {

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.node.scrollIntoView();
  }

  render() {
    const {
      messages,
      contactInfo,
      userId,
      convoId,
      handleTextBoxInput,
      textBoxInput,
      handleTextBoxChange,
      avatar,
    } = this.props;
    let chatsDiv = null;
    if (convoId !== null) {
      chatsDiv = messages.map(message => <Chat key={message._id} message={message} userId={userId} />);
    }
    return (
      <div className="chatbox">
        <div className="header-container">
          <Header avatar={avatar} contactInfo={contactInfo} />
        </div>
        <div className="conversation">
          {chatsDiv}
          <div ref={(node) => { this.node = node; }} />
        </div>
        <Textbox
          handleTextBoxInput={handleTextBoxInput}
          handleTextBoxChange={handleTextBoxChange}
          textBoxInput={textBoxInput}
        />
      </div>
    );
  }
}

export default withTracker(({ convoId, userInfo, contactId }) => {
  const userId = userInfo._id;
  return {
    messages: Messages.find({ convoId }, { sort: { createdAt: 1 } }).fetch(),
    contactInfo: Meteor.users.find({ _id: contactId }).fetch()[0],
    userId,
    avatar: Avatars.findOne({ userId: contactId }),
  };
})(Chatbox);
