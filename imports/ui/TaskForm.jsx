import React, { useState } from 'react'
import { TasksCollection } from '../api/TasksCollection'

export const TaskForm = () => {
    const [task, setTask] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!task) return;
        TasksCollection.insert({
            text: task,
            createdAt: new Date()
        })
        setTask('')

    }
    return (
        <form onSubmit={handleSubmit} className="task-form ">
            <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} placeholder="New Task" />
            <button type="submit">Add New Task</button>
       </form>
    )
}
