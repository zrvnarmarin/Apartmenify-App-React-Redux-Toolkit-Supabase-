import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './../features/counter/counterSlice';
import postsReducer from '../features/posts/postsSlice'
// import usersReducer from '../features/users/usersSlice'
import apartmentsReducer from '../components/apartmentsSlice'
import usersReducer from '../components/auth/usersSlice'
import cartReducer from '../features/cart/cartSlice'
import modalReducer from '../features/modal/modalSlice'
import reservationsReducer from '../components/reservationsSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        // users: usersReducer,
        apartments: apartmentsReducer,
        cart: cartReducer,
        modal: modalReducer,
        users: usersReducer,
        reservations: reservationsReducer
    }
})