import React, { useState, useEffect } from 'react'
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'
import PostsList from './features/posts/PostsList'
import AddNewPostForm from './features/posts/AddNewPostForm'
import Counter from './features/counter/Counter'
import { Route, Routes } from 'react-router-dom'
import MainPage from './components/MainPage'
import Apartments from './components/Apartments'
import Facilities from './components/Facilities';
import LoginPage from './components/LoginPage';
import RegisteredUsers from './components/RegisteredUsers';
import AddNewApartment from './components/AddNewApartment'
import FacilityGroupedApartments from './components/FacilityGroupedApartments.jsx'
import SignupPage from './components/SignupPage';


function App() {
  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])

  const imageListRef = ref(storage, 'images/')

  const uploadImage = () => {
    if (imageUpload === null) return

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        setImageList(prev => [...prev, url])
        console.log(url)
      })
    })
  }

  const deleteImage = () => {
    if (imageUpload) return

    // const imageRef = ref(storage, `images/react.pngfd33c880-46e5-4e1a-b802-76960aac3252`)
    // deleteObject(imageRef).then(() => {
    //   console.log('deleted image!')
    //   setImageList(imageList.filter(image => image.name))
    // }).catch(error => console.log(error))

    listAll(imageListRef).then(response => {
      const array = response.items.map(item => {
        const { _location: { path_: name } } = item
        console.log(name)
      })

      console.log(imageList)
    })
  }

  useEffect(() => {
    listAll(imageListRef).then(response => {
      response.items.map(item => {
        getDownloadURL(item).then(url => {
          setImageList(prev => [...prev, url])
        })
      })
    })
  }, [])

  

  return (
    <div>
      {/* <Counter />
      <div style={{ padding: '5px', border: '1px solid black'}}>
        <PostsList />
        <AddNewPostForm />
      </div> */}

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/main' element={<MainPage />}>
          <Route path='apartments' element={<Apartments />} />
          <Route path='facilities' element={<Facilities />} >
            <Route path=':facility' element={<FacilityGroupedApartments />} />
          </Route>
          <Route path='registeredUsers' element={<RegisteredUsers />} />
          <Route path='addNewApartment' element={<AddNewApartment />} />
        </Route>
      </Routes>

        {/* <input onChange={(e) => setImageUpload(e.target.files[0])} type="file" />
        <button onClick={uploadImage}>Upload Image</button>
        <button onClick={deleteImage}>Delete Image</button>
      
        {imageList.map((url, i) => {
          return <img key={i} src={url} />
        })} */}
      


    </div>
  )
}

export default App
