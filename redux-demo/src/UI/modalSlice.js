import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    isAdmin: false,
    modalType: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true
            state.modalType = action.payload
            console.log(action.payload, state.isModalOpen)
        },
        closeModal: (state, action) => {
            state.isModalOpen = false
            state.modalType = null
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        }
    }
})

// State exports
export const selectIsModalOpen = (state) => state.modal.isModalOpen
export const selectIsAdmin = (state) => state.modal.isAdmin
export const selectModalType = (state) => state.modal.modalType

// Reducer exports
export const { openModal, closeModal, setIsAdmin } = modalSlice.actions

// Slice export
export default modalSlice.reducer