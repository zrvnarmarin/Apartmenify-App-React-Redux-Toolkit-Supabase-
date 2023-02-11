import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns'

const initialState = [
    { 
        id: 1, 
        date: sub(new Date(), { minutes: 10 }).toISOString(), 
        title: 'Learning Redux Toolkit', 
        content: 'This is a post that shows how to learn modern framework Redux Toolkit',
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0
        }
    },
    { 
        id: 2, 
        date: sub(new Date(), { minutes: 5 }).toISOString(), 
        title: 'Slices', 
        content: 'Slice is a piece of information which contains reducers and state',
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0
        }
    },
]

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {state.push(action.payload)},
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const { addPost, addReaction } = postsSlice.actions

export const selectAllPosts = (state) => state.posts

export default postsSlice.reducer