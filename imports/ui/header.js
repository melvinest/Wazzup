import React from 'react';

const Header = ({ contactInfo, avatar, rightLink }) => {
  if (!contactInfo) return null;
  let image = 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png';
  if (avatar) image = avatar.avatar;
  let logout;
  if (rightLink) logout = (<div className="header-logout"><a className="logout-link" href="/logout">logout</a></div>);
  return (
    <div className="chatbox-header">
      <img className="contact-avatar" alt="pic" src={image} />
      <div className="contact-name">{contactInfo.username}</div>
      {logout}
    </div>
  );
};

export default Header;
