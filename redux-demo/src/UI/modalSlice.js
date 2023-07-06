import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    isAdmin: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true
        },
        closeModal: (state, action) => {
            state.isModalOpen = false
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        }
    }
})

// State exports
export const selectIsModalOpen = (state) => state.modal.isModalOpen
export const selectIsAdmin = (state) => state.modal.isAdmin

// Reducer exports
export const { openModal, closeModal, setIsAdmin } = modalSlice.actions

// Slice export
export default modalSlice.reducer