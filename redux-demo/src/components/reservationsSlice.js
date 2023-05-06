import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import supabase from "../supabaseClient";

export const addReservation = createAsyncThunk('reservations/addReservation', async newReservation => {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .insert([
                { 
                    apartmentId: newReservation.apartmentId,
                    apartmentTitle: newReservation.apartmentTitle,
                    userId: newReservation.userId,
                    userEmail: newReservation.userEmail,
                    name: newReservation.name,
                    surname: newReservation.surname,
                    startDate: newReservation.startDate,
                    endDate: newReservation.endDate,
                    status: newReservation.status
                }
            ])

            return newReservation
    } 
    catch (error) { 
        console.log(error.message)
        return error.message 
    }
})

export const getAllReservations = createAsyncThunk('reservations/getAllReservations', async () => {
    try {
        const { data, error } = await supabase
        .from('reservations')
        .select('*')

        // console.log('all reservations', data)

        return data
    } catch (error) {
        return error.message
    }
})

export const getReservationById = createAsyncThunk('reservations/getReservationById', async id => {
    try {
        const { data, error } = await supabase
        .from('reservations')
        .select()
        .eq('id', id)

        console.log(data)

        return data[0]
    } 
    catch (error) { return error.message }
})

export const getReservationsByApartmentId = createAsyncThunk('reservations/getReservationsByApartmentId', async apartmentId => {
    try {
        let { data, error } = await supabase
        .from('reservations')
        .select()
        .eq('apartmentId', apartmentId)

        // console.log(`All reservations on apartment with ID of ${apartmentId}: `, data)

        // TO DO: extract start and end dates for each reservation and disable those dates on date picker

        return data

    } catch (error) {
        return error.message
    }
})

export const getReservationsByUserEmail = createAsyncThunk('reservations/getReservationByUsername', async userEmail => {
    const { data, error } = await supabase
    .from('reservations')
    .select()
    .eq('userEmail', userEmail)

    // console.log(data)

    return data
})

export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async reservationId => {
    try {
        const { data, error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', reservationId)

    return reservationId

    } catch (error) {
        return error.message
    }
})

export const cancelReservation = createAsyncThunk('reservations/cancelReservation', async reservationId => {
    try {
        const { data, error } = await supabase
        .from('reservations')
        .update({
            status: 'canceled'
        })
        .eq('id', reservationId)
        console.log(reservationId, isCanceled.toString())

        return reservationId

    } catch (error) {
        return error.message
    }
})

export const updateReservation = createAsyncThunk('reservations/updateReservations', async (updatedReservation) => {
    const { data, error } = await supabase
    .from('reservations')
    .update({ 
      name: updatedReservation.name, 
      surname: updatedReservation.surname,
      startDate: updatedReservation.startDate,
      endDate: updatedReservation.endDate
    })
    .eq('userId', updatedReservation.user.userId)
    .eq('userEmail', updatedReservation.user.userEmail)

    console.log(updatedReservation.startDate, updatedReservation.endDate)
    return data
})

const initialState = {
    reservations: [],
    reservation: {}, 
    isLoading: false,
    error: null,
    dateRange: [null, null],
    startDate: '',
    endDate: '',
    currentDate: new Date().toLocaleDateString(),

    // User specific data
    name: '',
    surname: '',
    userId: '',
    userEmail: '',

    // User booking status filter
    bookingStatusFilter: 'current'
}

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        resetName: (state, action) => {
            state.name = ''
        },
        setSurname: (state, action) => {
            state.surname = action.payload
        },
        resetSurname: (state, action) => {
            state.surname = ''
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setUserEmail: (state, action) => {
            state.userEmail = action.payload
        },
        resetForm: (state, action) => {
            state.name = ''
            state.surname = ''
        },
        setStartDate: (state, action) => {
            state.startDate = new Date(action.payload).toISOString()
            console.log(state.startDate, 'start date reducer')
        },
        setEndDate: (state, action) => {
            state.endDate = new Date(action.payload).toISOString()
            console.log(state.endDate, 'end date reducer')
        },
        setDateRange: (state, action) => {
            const parsedDateRange = JSON.parse(action.payload)
            const formatedDates = parsedDateRange.map(dates => new Date(dates).toLocaleDateString())

            console.log(formatedDates, 'parsed date range')

            state.dateRange = parsedDateRange
            state.startDate = formatedDates[0]
            state.endDate = formatedDates[1]
        },
        setBookingStatusfilter: (state, action) => {
            state.bookingStatusFilter = action.payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(addReservation.fulfilled, (state, action) => {
            state.reservations.push(action.payload)
        })
        .addCase(getAllReservations.fulfilled, (state, action) => {
            state.reservations = action.payload
            state.isLoading = false
            // console.log(action.payload)
        })
        .addCase(getAllReservations.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getReservationById.fulfilled, (state, action) => {
            state.reservation = action.payload
        })
        .addCase(getReservationsByApartmentId.fulfilled, (state, action) => {
            state.reservations = action.payload
            state.isLoading = false
        })
        .addCase(deleteReservation.fulfilled, (state, action) => {
            state.reservations = state.reservations.filter(reservation => reservation.id !== action.payload)
            state.isLoading = false
        })
        .addCase(deleteReservation.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(cancelReservation.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getReservationsByUserEmail.fulfilled, (state, action) => {
            state.reservations = action.payload
            state.isLoading = false
        })
        .addCase(updateReservation.fulfilled, (state, action) => {
            state.reservation = action.payload
            state.isLoading = false
        })
    }
})

// States
export const selectName = (state) => state.reservations.name
export const selectSurname = (state) => state.reservations.surname
export const selectAllReservations = (state) => state.reservations.reservations
export const selectIsLoading = (state) => state.reservations.isLoading
export const selectUserId = (state) => state.reservations.userId
export const selectUserEmail = (state) => state.reservations.userEmail
export const selectStartDate = (state) => state.reservations.startDate
export const selectEndDate = (state) => state.reservations.endDate
export const selectDateRange = (state) => state.reservations.dateRange
export const selectCurrentDate = (state) => state.reservations.currentDate
export const selectBookingStatusFilter = (state) => state.reservations.bookingStatusFilter

// Reducers
export const { 
    setName, setSurname, resetName, resetSurname, 
    setUserId, setUserEmail, setDateRange, setStartDate,
    setEndDate, resetForm, setBookingStatusfilter
} = reservationsSlice.actions

// Memoized selectors
export const filteredReservationsByBookingStatus = createSelector(
    [selectAllReservations, selectBookingStatusFilter],
    (allReservations, bookingStatusFilter) => {
        if (bookingStatusFilter.toLowerCase() === 'current') {
            return allReservations.filter(reservation => reservation.status === 'confirmed' || reservation.status === 'inProgress')
        }
        if (bookingStatusFilter.toLowerCase() === 'previous') {
            return allReservations.filter(reservation => reservation.status === 'finished')
        }
        if (bookingStatusFilter.toLowerCase() === 'canceled') {
            return allReservations.filter(reservation => reservation.status === 'canceled')
        }
        else {
            return allReservations
        }
    }
)

// TO DO: napravi filtirriranje rezervacija po statusu - conformed, inProgress, finished, canceled --> gumb koji tracka pojedini status;
// napravi filter u input za korisnike, i filtriranje od - do datuma --> user unese od do values i filtriraju se unutar tih datuma
export const filteredReservationsByStatus = createSelector(
    [selectAllReservations, filter]
)

// Slice
export default reservationsSlice.reducer