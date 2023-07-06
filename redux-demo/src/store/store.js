import { configureStore } from '@reduxjs/toolkit';
import apartmentsReducer from '../components/admin/apartments/apartmentsSlice'
import usersReducer from '../components/auth/usersSlice'
// import modalReducer from '../features/modal/modalSlice'
// import usersReducer from '../components/auth/usersSlice'
import reservationsReducer from '../components/admin/reservations/reservationsSlice'
import ratingsReducer from '../components/user/ratings/ratingsSlice'
import modalReducer from '../UI/modalSlice'

export const store = configureStore({
    reducer: {
        // users: usersReducer,
        apartments: apartmentsReducer,
        modal: modalReducer,
        users: usersReducer,
        reservations: reservationsReducer,
        ratings: ratingsReducer
    }
})