import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts_config';
import App from '../imports/ui/App';
import '../imports/startup/routes';


Meteor.startup(() => {
  render(<App />, document.getElementById('react-root'));
});
