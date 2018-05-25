import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Avatars from '../api/avatars';
import Conversations from '../api/conversations';

const SideabarEntry = ({ entry, avatar, convo, handleClickEntry }) => {
  if (!entry) return null;
  let image = 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png';
  if (avatar) image = avatar.avatar;
  let link;
  let newChat;
  if (convo) {
    link = `/chats/${convo._id}`;
    newChat = false;
  } else {
    link = '/chats/new';
    newChat = true;
  }
  return (
    <div className="convo-entry" onClick={() => { handleClickEntry(entry._id, convo); }}>
      <a className="convo-anchor" href={link}>
        <div className="convo-top-container">
          <img className="contact-avatar" alt="pic" src={image} />
          <div className="convo-contact-name">{entry.username}</div>
        </div>
      </a>
    </div>
  );
};

export default withTracker(({ entry, userId }) => {
  return {
    avatar: Avatars.findOne({ userId: entry._id }),
    convo: Conversations.findOne({ authors: { $all: [userId, entry._id] } }),
  };
})(SideabarEntry);
