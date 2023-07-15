import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import supabase from "../../../supabaseClient";
import { formatDate } from "../../../utils/utilityFunctions";

export const addReservation = createAsyncThunk('reservations/addReservation', async newReservation => {
    // console.log(newReservation.startDate, newReservation.endDate)
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

export const getReservationsByUserId = createAsyncThunk('reservations/getReservationByUsername', async userId => {
    const { data, error } = await supabase
    .from('reservations')
    .select()
    .eq('userId', userId)

    return data
})

export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async reservationId => {
    try {
        const { data, error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', reservationId)

        console.log(reservationId)
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
    .eq('id', updatedReservation.reservationId)

    console.log(updatedReservation.startDate, updatedReservation.endDate)
    return data
})

export const updateReservationStatus = createAsyncThunk('reservations/updateReservationStatus', async (reservation) => {
    const { data, error } = await supabase
    .from('reservations')
    .update({
        status: reservation.reservationStatus
    })
    .eq('id', reservation.reservationId)

    console.log(reservation)

    return data

})

const initialState = {
    reservations: [],
    reservation: {}, 
    isLoading: false,
    error: null,
    dateRange: [null, null],

    // User specific data
    name: '',
    surname: '',
    userId: '',
    userEmail: '',

    // User 
    bookingStatusFilter: 'current',
    allCurrentApartmentReservations: [],
    totalPriceOfStay: 0,
    
    // Admin 
    reservationFilter: 'all',
    reservationFilterQuery: '',
    reservationStatusFilter: 'confirmed'
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

            // console.log(formatedDates, 'parsed date range')

            state.dateRange = parsedDateRange
            state.startDate = formatedDates[0]
            state.endDate = formatedDates[1]
        },
        setReservationFilter: (state, action) => {
            state.reservationFilter = action.payload
        },
        setBookingStatusfilter: (state, action) => {
            state.bookingStatusFilter = action.payload
        },
        setReservationStatusfilter: (state, action) => {
            state.reservationStatusFilter = action.payload
            // console.log(action.payload)
        },
        setReservationFilterQuery: (state, action) => {
            state.reservationFilterQuery = action.payload
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
        })
        .addCase(getAllReservations.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getReservationById.fulfilled, (state, action) => {
            state.reservation = action.payload
        })
        .addCase(getReservationsByApartmentId.fulfilled, (state, action) => {
            state.allCurrentApartmentReservations = action.payload
            state.isLoading = false

            // console.log(action.payload, 'all reservations from all users on this apartment')

            // console.log(action.payload)
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
        .addCase(getReservationsByUserId.fulfilled, (state, action) => {
            state.reservations = action.payload
            state.isLoading = false
        })
        .addCase(getReservationsByUserId.pending, (state, action) => {
            state.isLoading = true
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
export const selectBookingStatusFilter = (state) => state.reservations.bookingStatusFilter
export const selectReservationStatusFilter = (state) => state.reservations.reservationStatusFilter
export const selectReservationFilter = (state) => state.reservations.reservationFilter
export const selectReservationFilterQuery = (state) => state.reservations.reservationFilterQuery
export const selectAllCurrentApartmentReservations = (state) => state.reservations.allCurrentApartmentReservations

// Reducers
export const { 
    setName, setSurname, resetName, resetSurname, 
    setUserId, setUserEmail, setDateRange, setStartDate,
    setEndDate, resetForm, setBookingStatusfilter, setReservationStatusfilter,
    setReservationFilter, setReservationFilterQuery
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
);

export const filteredReservations = createSelector(
    [selectAllReservations, selectReservationStatusFilter, selectReservationFilter, selectReservationFilterQuery],
    (allReservations, reservationStatusFilter, reservationFilter, reservationFilterQuery) =>
      allReservations
      .filter(reservation => {
        let user = reservation.name + ' ' + reservation.surname;
  
        if (reservationFilter === 'all') {
          return true;
        } else if (reservationFilter === 'apartment title') {
          return reservation.apartmentTitle.toLowerCase().includes(reservationFilterQuery.toLowerCase());
        } else if (reservationFilter === 'user') {
          return user.toLowerCase().includes(reservationFilterQuery.toLowerCase());
        }
  
        return false;
      })
      .filter(reservation => {
        if (reservationStatusFilter === 'Confirmed') return reservation.status === 'confirmed'
        else if (reservationStatusFilter === 'In Progress') return reservation.status === 'inProgress'
        else if (reservationStatusFilter === 'Canceled') return reservation.status === 'canceled'
        else if (reservationStatusFilter === 'Finished') return reservation.status === 'finished'
  
        return false;
      })
);

export const allCurrentApartmentReservationsStartAndEndDates = createSelector(
    [selectAllCurrentApartmentReservations],
    (allCurrentApartmentReservations) => {
        const intervals = allCurrentApartmentReservations.map(reservation => ({
            start: new Date(reservation.startDate.slice(0, 10)),
            end: new Date(reservation.endDate.slice(0, 10))
        }));

        // Add an interval for the day before the start date of each reservation
        const beforeIntervals = allCurrentApartmentReservations.map(reservation => ({
            start: new Date(reservation.startDate.slice(0, 10)).setDate(new Date(reservation.startDate.slice(0, 10)).getDate() - 1),
            end: new Date(reservation.startDate.slice(0, 10))
        }));

        return [...intervals, ...beforeIntervals];
    }
)

export const desiredStayNightsNumber = createSelector(
    [selectStartDate, selectEndDate],
    (startDate, endDate) => {
      if (startDate && endDate) {
        const dates = [];
    
        // Convert the start and end date states to date objects
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        
        // Clone the start date
        const currentDate = new Date(startDateObj);
        
        // Loop until the current date is less than the end date
        while (currentDate < endDateObj) {
          dates.push(formatDate(currentDate));
          
          // Increment the current date by 1 day
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return dates.length;
      }
  
      return 0;
    }
  );

// Slice
export default reservationsSlice.reducer