import React, { useState } from 'react'
import { addPost } from './postsSlice'
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

const AddNewPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const titleChangeHandler = e => setTitle(e.target.value)
    const contentChangeHandler = e => setContent(e.target.value)

    const dispatch = useDispatch()
    const onAddNewPost = (post) => dispatch(addPost(post))

    const formSubmitHandler = e => {
        e.preventDefault()

        if (title && content) {
            onAddNewPost({
                title: title,
                content: content,
                id: nanoid()
            })

            setTitle('')
            setContent('')
        }
    }



  return (
    <form onSubmit={formSubmitHandler}>
        <label htmlFor="postTitle">Title: </label>
        <input value={title} onChange={titleChangeHandler} type="text" id='postTitle' /> <br /> <br />
        <label htmlFor="postContent">Content: </label>
        <textarea value={content} onChange={contentChangeHandler} name="postContent" id="postContent" cols="30" rows="10"></textarea>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default AddNewPostForm