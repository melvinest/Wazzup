import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Meteor } from 'meteor/meteor';
import AppContainer from '../ui/App';
import Authentication from '../ui/authentication';

FlowRouter.route('/', {
  name: 'redirect',
  action() {
    if (!Meteor.user()) {
      FlowRouter.redirect('/login');
    } else {
      FlowRouter.redirect('/chats');
    }
  },
});

FlowRouter.route('/login', {
  name: 'login',
  action(params, { status }) {
    if (status === 'error') mount(Authentication, { status: 'Login', check: 'wrong credentials' });
    else if (status === 'verified') FlowRouter.redirect('/chats');
    else mount(Authentication, { status: 'Login' });
  },
});

FlowRouter.route('/register', {
  name: 'register',
  action(params, { status }) {
    if (status === 'error') mount(Authentication, { status: 'Register', check: 'username already taken' });
    else if (status === 'verified') FlowRouter.redirect('/chats');
    else mount(Authentication, { status: 'Register' });
  },
});

FlowRouter.route('/logout', {
  name: 'login',
  action(params, { status }) {
    Meteor.logout();
    FlowRouter.redirect('/login');
  },
});

FlowRouter.route('/chats', {
  name: 'chats',
  action() {
    if (Meteor.user()) mount(AppContainer);
    else FlowRouter.redirect('/login');
  },
});

FlowRouter.route('/chats/:convoId', {
  name: 'chats',
  action() {
    if (Meteor.user()) {
      mount(AppContainer);
    } else FlowRouter.redirect('/login');
  },
});

