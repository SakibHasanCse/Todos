import React, { useState, Fragment } from 'react';
import { Task } from './Task.jsx';
import { TasksCollection } from '/imports/api/db/TasksCollection'
import { LoginForm } from './LoginForm'
import { TaskForm } from './TaskForm'
import { useTracker } from 'meteor/react-meteor-data';


const toggleCheckbox = ({ _id, isCheckd }) => {

  // TasksCollection.update(_id, {
  //   $set: {
  //     isCheckd: !isCheckd
  //   }
  // })
  Meteor.call('tasks.setIsChecked' , _id, !isCheckd)
}
// const deleteTask = (_id) => TasksCollection.remove(_id)
const deleteTask = (_id) => Meteor.call('tasks.remove', _id)



export const App = () => {
  const hideCompletedFilter = { isCheckd: { $ne: true } }
  const [hideCompleted, sethideCompleted] = useState(false)


  const user = useTracker(() => Meteor.user())

  const useerFilter = user ? { userId: user._id } : {}
  const pandingOnlyFilter = { ...hideCompletedFilter, ...useerFilter }


  const {tasks ,pandingTasksCount , isLoading} = useTracker(() => {

    const onDataAvailable = { tasks: [], pandingTasksCount: 0 };

    if (!Meteor.user()) {
      return onDataAvailable 
    }

    const handler = Meteor.subscribe('tasks')
    if (!handler.ready()) {
      return { ...onDataAvailable , isLoading:true }
    }
    if (!user) return []

    const tasks = TasksCollection.find(
      hideCompleted ? hideCompletedFilter : {}
      , { sort: { createdAt: -1 }, limit: 35 }).fetch()
    
 

  
    const pandingTasksCount = TasksCollection.find(pandingOnlyFilter).count()
    return {tasks, pandingTasksCount}

 }
  )
  const totalPandings = pandingTasksCount ? (`  (${pandingTasksCount})`) : (0)

  const logOut =()=> Meteor.logout()
  return (

    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <div className="todo">

            📝️To Do List
   {totalPandings}
            </div>
             <div className="user" onClick={logOut}>
          {user && user.username}
        </div>
          </div>
        </div>
       

      </header>
      <div className="main">
        {user ? (
          <Fragment>
            <TaskForm user={user} />
            <div className="filter">
              <button onClick={() => sethideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed '}
              </button>
            </div>
            {isLoading && <div className="loading">loading...</div>}

            <ul className="tasks">
              {tasks && tasks.map((task, i) => <Task
                key={i} task={task}
                onCheckBoxClick={toggleCheckbox}
                onDeleteButton={deleteTask}
              />)}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
          // <h2>HI</h2>


        )
        }

      </div>
    </div >
  )
}

