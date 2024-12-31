'use client'//クライアントコンポーネントであることを明示的に表記する必要がある
import React from 'react'

const ClientComponent = () => {
  console.log("Client Component");
  return (
    <div>ClientComponent</div>
  )
}

export default ClientComponent