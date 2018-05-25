const faker = require('faker');
const fs = require('file-system');
const path = require('path');

const userData = [
  { username: 'wakawaka', userId: 'HuAeAs5KgeKQvmdNk' },
  { username: 'h', userId: 'Bu7Xja7BbCiwte7Jw' },
  { username: 'doggy', userId: 'owFsFKpSA4Qd5YLhb' },
];

const createConversation = (user, contact, id) => ({
  convoId: id,
  authors: [user, contact],
});

const conversations = [];
let count = 0;
for (let i = 0; i < userData.length; i += 1) {
  for (let j = 0; j < userData.length; j += 1) {
    if (i !== j) {
      conversations.push(createConversation(userData[i].userId, userData[j].userId, count));
      count += 1;
    }
  }
}

const createMessage = (author, convoId, messageId) => ({
  author,
  body: faker.lorem.paragraphs(),
  convoId,
  createdAt: faker.date.past(),
  messageId,
});

const messages = [];
count = 0;
for (let i = 0; i < conversations.length; i += 1) {
  for (let j = 0; j < 10; j += 1) {
    messages.push(createMessage(conversations[i].authors[Math.round(Math.random())], conversations[i].convoId, count));
    count += 1;
  }
}

const promisifyWriteFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, `/${filename}.json`), JSON.stringify(data, null, 4), (data, err) => {
      resolve();
      reject(err);
    });
  });
};

const objs = { userData, conversations, messages };

Promise.all(Object.keys(objs).map((name) => {
  promisifyWriteFile(name, objs[name]);
}, console.log('complete!')));

