import { Mongo } from 'meteor/mongo';

const Conversations = new Mongo.Collection('conversations');

export default Conversations;
