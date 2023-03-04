import React, { useState, useEffect } from 'react'
import PostsList from './features/posts/PostsList'
import AddNewPostForm from './features/posts/AddNewPostForm'
import Counter from './features/counter/Counter'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MainPage from './components/MainPage'
import Apartments from './components/Apartments'
import Facilities from './components/Facilities';
import LoginPage from './components/LoginPage';
import RegisteredUsers from './components/RegisteredUsers';
import AddNewApartment from './components/AddNewApartment'
import FacilityGroupedApartments from './components/FacilityGroupedApartments.jsx'
import SignupPage from './components/SignupPage';
import CartShop from './features/cart/CartShop'
import supabase from './supabaseClient'
import Success from './components/auth/Success.jsx'

// const Success = () => {
//   const [user, setUser] = useState({})
//   const navigate = useNavigate()

//   useEffect(() => {
//     const getUserData = async () => {
//       await supabase.auth.getUser().then((value) => {
//         // value.data.user
//         if (value.data?.user) {
//           console.log(value.data.user)
//           setUser(value.data.user)
//         }
//       })
//     }

//     getUserData()
//   }, [])

//   // useEffect(() => {
//   //   const timeout = setTimeout(() => {
//   //     navigate('/main/apartments')
//   //   }, 2500)

//   //   // Clean up the timeout on unmount
//   //   return () => clearTimeout(timeout)
//   // }, [navigate])

//   const signOutUser = async () => {
//     const { error } = await supabase.auth.signOut()
//     navigate('/')
//   }

//   return (
//     <div>
//       {Object.keys(user).length !== 0 
//         ? 
//           <>
//             <p className='text-4xl font-bold'>Success</p>
//             <button 
//               onClick={signOutUser} 
//               className='border-2 border-black p-2 bg-red-100'
//             >
//               Sign Out
//             </button>
//           </>
//         : 
//         <>
//           <h1>User is not logged in!</h1>
//           <button onClick={() => navigate('/')}>Go back home!</button>
//         </>
//       }
      
//       Redirecting to main page...
//     </div>
//   )
// }

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
        <Route path='/success' element={<Success />} />
        {/* <Route path='/cart' element={<CartShop /> } /> */}
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

    </div>
  )
}

export default App
