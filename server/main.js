import { Meteor } from 'meteor/meteor';

import { TasksCollection } from '/imports/api/TasksCollection'
import { Account } from 'meteor/account-base';

const insetTask = task => TasksCollection.insert({ text: task.text, id: task.id })


const username = 'sakib'
const email = 'sakib@gmail.com'
const password = '12345'
Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      {

        text: 'Hello Dev'
      },
      {

        text: 'Hello Dev 2'
      }, {

        text: 'Hello Dev 3'
      }, {

        text: 'Hello Dev 4'
      }
    ].forEach(insetTask)
  }

  if (!Account.finUserByUsername(username)) {
    Account.createUser({ username: username, email: email, password: password })
  }

})
