import React, { useState } from 'react'
import PostsList from './features/posts/PostsList'
import AddNewPostForm from './features/posts/AddNewPostForm'
import Counter from './features/counter/Counter'

function App() {

  return (
    <div>
      <Counter />
      <PostsList />
      <AddNewPostForm />
    </div>
  )
}

export default App
