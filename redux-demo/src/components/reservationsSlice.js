import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addReservation = createAsyncThunk('reservations/addReservation', async newReservation => {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .insert([
                { 
                    apartmentId: newReservation.apartmentId,
                    userId: newReservation.userId,
                    reservationDate: newReservation.reservationDate
                }
            ])
            .single()

            return newReservation
    } 
    catch (error) { 
        console.log(error.message)
        return error.message 
    }
})

const initialState = {
    name: '',
    surname: '',
    startDate: null,
    endDate: null,
    reservation: [],
}

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        setName (state, action) {
            state.name = action.payload
        },
        setSurname (state, action) {
            state.surname = action.payload
        },
        setStartDate (state, action) {
            state.startDate = action.payload
        },
        setEndDate (state, action) {
            state.endDate = action.payload
        }
    },
    extraReducers(builder) {
        builder
        addCase(addReservation.fulfilled, (state, action) => {

        })
    }
})

// Exports
export const selectName = (state) => state.reservations.name
export const selectSurname = (state) => state.reservations.surname
export const selectStartDate = (state) => state.reservations.startDate
export const selectEndDate = (state) => state.reservations.endDate
export const selectReservation = (state) => state.reservations.reservation

export const { setName, setSurname, setStartDate, setEndDate } = reservationsSlice.actions


export default usersSlice.reducer