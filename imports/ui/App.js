import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import ChatBox from './chatbox';
import Sidebar from './sidebar';
import Messages from '../api/messages';
import Avatars from '../api/avatars';
import Conversations from '../api/conversations';

class App extends Component {
  constructor() {
    super();
    this.state = {
      textBoxInput: '',
      sidebarDisplay: 'convos',
      convoId: null,
      contactId: null,
      newChat: null,
      searchBoxInput: '',
    };
  }

  handleClickEntry(contactId, convo) {
    let convoId = null;
    let newChat = false;
    if (convo) convoId = convo._id;
    else newChat = true;

    this.setState({
      convoId,
      contactId,
      newChat,
    });
  }

  handleTextBoxInput(e) {
    if (e.key === 'Enter') {
      let convoId;
      if (this.state.newChat) {
        convoId = Conversations.insert({ authors: [this.props.userInfo._id, this.state.contactId] });
      } else {
        convoId = this.state.convoId;
      }
      Messages.insert({
        author: this.props.userInfo._id,
        body: this.state.textBoxInput,
        convoId,
        createdAt: new Date(),
      });
      this.setState({ convoId, newChat: false, textBoxInput: '' });
      FlowRouter.go(`/chats/${convoId}`);
    }
  }

  handleTextBoxChange(e) {
    this.setState({ textBoxInput: e.target.value });
  }

  handleSearchBoxChange(e) {
    let sidebarDisplay;
    if (e.target.value === '') sidebarDisplay = 'convos';
    else sidebarDisplay = 'search';

    this.setState({
      sidebarDisplay,
      searchBoxInput: e.target.value,
    });
  }

  render() {
    if (!this.props.userInfo) return null;
    return (
      <div className="app-container">
        <Sidebar
          userInfo={this.props.userInfo}
          avatar={this.props.avatar}
          sidebarDisplay={this.state.sidebarDisplay}
          handleClickEntry={(contactId, convo) => { this.handleClickEntry(contactId, convo); }}
          searchBoxInput={this.state.searchBoxInput}
          handleSearchBoxChange={(e) => { this.handleSearchBoxChange(e); }}
        />
        <ChatBox
          textBoxInput={this.state.textBoxInput}
          handleTextBoxChange={(e) => { this.handleTextBoxChange(e); }}
          handleTextBoxInput={(e) => { this.handleTextBoxInput(e); }}
          convoId={this.state.convoId}
          userInfo={this.props.userInfo} contactId={this.state.contactId}
        />
      </div>
    );
  }
}

export default withTracker(() => {
  const userInfo = Meteor.user();
  const userId = Meteor.userId();
  return {
    userInfo,
    avatar: Avatars.findOne({ userId: userId }),
  };
})(App);
