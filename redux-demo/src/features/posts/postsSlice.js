import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    { id: 1, title: 'Learning Redux Toolkit', content: 'This is a post that shows how to learn modern framework Redux Toolkit'},
    { id: 2, title: 'Slices', content: 'Slice is a piece of information which contains reducers and state'},
]

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {state.push(action.payload)},
    }
})

export const { addPost } = postsSlice.actions

export const selectAllPosts = (state) => state.posts

export default postsSlice.reducer