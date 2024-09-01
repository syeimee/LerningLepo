import React from 'react'

const TaskLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <>
        <div className="bg-blue-300 p-4">
          <div>TaskLayout</div>
          <div>{children}</div>
        </div>

    </>
  )
}

export default TaskLayout