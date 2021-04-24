import { Meteor } from 'meteor/meteor';

import { TasksCollection } from '/imports/api/db/TasksCollection'
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/taskMethods'
import '/imports/api/taskPublications'


const username = 'sakib'
const email = 'sakib@gmail.com'
const password = '12345'

const insertTask = (text, user) => {
  TasksCollection.insert({
    text: text,
    userId: user._id,
    createdAt: new Date()

  })
}



Meteor.startup(() => {
  if (!Accounts.findUserByUsername(username)) {
    Accounts.createUser({ username: username, email: email, password: password })
  }

  const user = Accounts.findUserByUsername(username)

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
    ].forEach(text => insertTask(text, user))
  }



})
