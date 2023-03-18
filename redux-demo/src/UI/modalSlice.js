import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false
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
        }
    }
})

// State exports
export const selectIsModalOpen = (state) => state.modal.isModalOpen

// Reducer exports
export const { openModal, closeModal } = modalSlice.actions

// Slice export
export default modalSlice.reducer