import React, { useState } from 'react'
import { TasksCollection } from '../api/db/TasksCollection'

export const TaskForm = ({ user }) => {
    const [task, setTask] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!task) return;
        // TasksCollection.insert({
        //     text: task,
        //     createdAt: new Date(),
        //     userId: user.id
        // })
        Meteor.call('tasks.insert', task)
        setTask('')

    }
    return (
        <form onSubmit={handleSubmit} className="task-form ">
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="New Task" />
            <button type="submit">Add New Task</button>
        </form>
    )
}
