import React, { useState } from 'react'
import { addPost } from './postsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { selectAllUsers } from './../users/usersSlice';

const AddNewPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const titleChangeHandler = e => setTitle(e.target.value)
    const contentChangeHandler = e => setContent(e.target.value)
    const authorChangeHandler = e => setUserId(e.target.value)

    const users = useSelector(selectAllUsers)

    const dispatch = useDispatch()
    const onAddNewPost = (post) => dispatch(addPost(post))

    const formSubmitHandler = e => {
        e.preventDefault()

        if (title && content) {
            onAddNewPost({
                title: title,
                content: content,
                id: nanoid(),
                userId: userId,
                date: new Date().toISOString(),
                reactions: {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0
                }
            })

            setTitle('')
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    return (
        <form onSubmit={formSubmitHandler}>
            <label htmlFor="postTitle">Title: </label>
            <input value={title} onChange={titleChangeHandler} type="text" id='postTitle' /> <br /> <br />
            <label htmlFor="postContent">Content: </label>
            <textarea value={content} onChange={contentChangeHandler} name="postContent" id="postContent" cols="30" rows="10"></textarea>
            <label  htmlFor="postauthor">Authors: </label>
            <select onChange={authorChangeHandler} name="postAuthor" id="postAuthor">
                <option value=""></option>
                {users.map(user => 
                    <option 
                        key={user.id} 
                        value={user.id}
                    >
                        {user.name}
                    </option>    
                )}
            </select>
            <button disabled={!canSave} type='submit'>Submit</button>
        </form>
    )
}

export default AddNewPostForm