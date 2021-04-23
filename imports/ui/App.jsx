import React, { useState } from 'react';
import { Task } from './Task.jsx';
import { TasksCollection } from '/imports/api/TasksCollection'

import {TaskForm} from './TaskForm'
import { useTracker } from 'meteor/react-meteor-data';

// const tasks = [
//   {
//     id: 1,
//     text: 'Hello Dev'
//   },
//   {
//     id: 2,
//     text: 'Hello Dev 2'
//   }, {
//     id: 3,
//     text: 'Hello Dev 3'
//   }, {
//     id: 4,
//     text: 'Hello Dev 4'
//   },
// ]


const toggleCheckbox = ({ _id, isCheckd }) => {
  console.log(_id)
  TasksCollection.update(_id, {
    $set: {
      isCheckd: !isCheckd
    }
  })
}
const deleteTask = (_id) => TasksCollection.remove(_id)


export const App = () => {
  const hideCompletedFilter = {isCheckd :{$ne: true}}
  const [hideCompleted, sethideCompleted] = useState(false)
  
  const tasks = useTracker(() => TasksCollection.find(
        hideCompleted ? hideCompletedFilter:{}
  ,{sort: {createdAt: -1},limit:35 }).fetch())


  const pandingTasksCount = useTracker(() => TasksCollection.find(hideCompletedFilter).count())
  
  const paddingTaskTitle = `
    ${
    pandingTasksCount ? `(${pandingTasksCount}) ` :""
    }
  `
  console.log(paddingTaskTitle)

  return (
    
  <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
           📝️ To Do List
      {paddingTaskTitle}
          </div>
        </div>
      </header>
      <div className="main">
        <TaskForm />
        <div className="filter">
          <button onClick={() => sethideCompleted(!hideCompleted)}>
            {hideCompleted ? 'Show All' : 'Hide Completed '}
          </button>
        </div>
    
    <ul className="tasks">
      {tasks && tasks.map((task, i) => <Task
        key={i} task={task}
        onCheckBoxClick={toggleCheckbox}
        onDeleteButton ={deleteTask}
        />)}
        </ul>
        
        <h2 className="panding-task-title">Panding tasks</h2>
    
      
   
       </div>
  </div>
        )
}
