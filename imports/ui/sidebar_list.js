import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SidebarEntry from './sidebar_entry';
import SearchEntry from './search_entry';
import Conversations from '../api/conversations';

const SidebarList = ({ userId, sidebarDisplay, entries, handleClickEntry }) => {
  let EntryComponent = SearchEntry;
  if (sidebarDisplay === 'convos') EntryComponent = SidebarEntry;
  return (
    <div className="convos-container">
      {
        entries.map((entry) => {
          return (<EntryComponent
            key={entry._id}
            userId={userId}
            entry={entry}
            sidebarDisplay={sidebarDisplay}
            handleClickEntry={handleClickEntry}
          />);
        })
      }
    </div>
  );
};

export default withTracker(({ sidebarDisplay, userId, searchBoxInput }) => {
  let entries = null;
  if (sidebarDisplay === 'convos') {
    entries = Conversations.find({ authors: { $all: [userId] } }).fetch();
  }
  if (sidebarDisplay === 'search') {
    entries = Meteor.users.find({ $and: [{ _id: { $not: userId } }, { username: new RegExp(searchBoxInput, 'gi') }] }).fetch();
  }
  return {
    entries,
  };
})(SidebarList);
