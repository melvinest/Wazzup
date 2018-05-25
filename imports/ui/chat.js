import React from 'react';
import moment from 'moment';

export default ({ message, userId }) => {
  const style = userId === message.author ? 'user-chat' : 'contact-chat';
  return (
    <div className="chat-container">
      <div className={`chat-bubble ${style}`}>
        <div className="chat-body">{message.body.replace('\n', '\n\n')}</div>
        <div className="chat-date">{moment(message.createdAt).fromNow()}</div>
      </div>
    </div>
  );
};
