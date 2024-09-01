// "/task"に対応するtsx
import React from 'react'
import { Task } from '../../api/tasks/route'

//fetch(ENDPOINT,{method})
const getTasks = async () => {
  const response = await fetch('http://localhost:3000/api/tasks', { 
    method: 'GET', 
    cache: 'no-cache'
  })
  return await response.json();
}
const TaskPage = async () => {
  const tasks = (await getTasks()).tasks as Task[];
  return (
    <div>
      <div>task page</div>
      <div>
        {tasks.map((task)=>(
          <div key = {task.id}> {task.name}</div>
        ))}
      </div>
    </div>

  )
}

export default TaskPage