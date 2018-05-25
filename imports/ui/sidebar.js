import React from 'react';
import Header from './header';
import Searchbox from './searchbox';
import SidebarList from './sidebar_list';

const Sidebar = ({ userInfo, avatar, sidebarDisplay, 
  handleClickEntry, searchBoxInput, handleSearchBoxChange }) => {
  if (!userInfo) return null;
  return (
    <div className="sidebar-container">
      <div className="header-container">
        <Header contactInfo={userInfo} avatar={avatar} rightLink={true} />
      </div>
      <Searchbox
        handleSearchBoxChange={handleSearchBoxChange}
        searchBoxInput={searchBoxInput}
      />
      <SidebarList
        sidebarDisplay={sidebarDisplay}
        handleClickEntry={handleClickEntry}
        userId={userInfo._id}
        searchBoxInput={searchBoxInput}
      />
    </div>
  );
};

export default Sidebar;
