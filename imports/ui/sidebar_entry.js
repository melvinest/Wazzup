import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Messages from '../api/messages';
import Avatars from '../api/avatars';

const SideabarEntry = ({ entry, lastMessage, contactInfo, avatar, handleClickEntry }) => {
  if (!contactInfo || !lastMessage) return null;
  let message;
  message = lastMessage.body.length > 40 ? `${lastMessage.body.substring(0, 40)}...` : lastMessage.body;
  if (lastMessage.author !== contactInfo._id) {
    message = `You: ${message}`;
  }
  let image = 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png';
  if (avatar) image = avatar.avatar;
  return (
    <div className="convo-entry" onClick={() => { handleClickEntry(contactInfo._id, entry); }}>
      <a className="convo-anchor" href={`/chats/${entry._id}`}>
        <div className="convo-top-container">
          <img className="contact-avatar" alt="pic" src={image} />
          <div className="convo-contact-name">{contactInfo.username}</div>
        </div>
        <div className="message-body">{message}</div>
      </a>
    </div>
  );
};

export default withTracker(({ entry, userId }) => {
  const { authors } = entry;
  const contactId = authors[0] === userId ? authors[1] : authors[0];
  return {
    lastMessage: Messages.findOne({ convoId: entry._id }, { sort: { createdAt: -1 } }),
    contactInfo: Meteor.users.find({ _id: contactId }).fetch()[0],
    avatar: Avatars.findOne({ userId: contactId }),
  };
})(SideabarEntry);
