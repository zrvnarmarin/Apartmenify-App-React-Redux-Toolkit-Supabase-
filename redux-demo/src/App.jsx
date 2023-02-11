import React, { useState } from 'react'
import PostsList from './features/posts/PostsList'
import AddNewPostForm from './features/posts/AddNewPostForm'
import Counter from './features/counter/Counter'
import { Route, Routes } from 'react-router-dom'
import MainPage from './components/MainPage'
import ApartmentTable from './components/ApartmentTable'
import Facilities from './components/Facilities';
import LoginPage from './components/LoginPage';
import RegisteredUsers from './components/RegisteredUsers';

function App() {

  return (
    <div>
      {/* <Counter />
      <div style={{ padding: '5px', border: '1px solid black'}}>
        <PostsList />
        <AddNewPostForm />
      </div> */}

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/main' element={<MainPage />}>
          <Route path='apartments' element={<ApartmentTable />} />
          <Route path='facilities' element={<Facilities />} />
          <Route path='registeredUsers' element={<RegisteredUsers />} />
        </Route>

      </Routes>


    </div>
  )
}

export default App
