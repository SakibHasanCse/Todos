import React from 'react'


export const Task = ({ task, onCheckBoxClick ,onDeleteButton}) => {
    return (

        <li>
            
            <input
                checked={ !!task.isCheckd}
                onClick={()=> onCheckBoxClick(task)}
                type="checkbox" readonly />

            <span>
            
            {task.text}
            </span>

            <button onClick={()=> onDeleteButton(task._id)}>&times;</button>
        
        </li>

    )
}