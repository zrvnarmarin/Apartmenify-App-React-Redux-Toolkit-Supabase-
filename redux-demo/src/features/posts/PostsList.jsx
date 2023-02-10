import React from 'react'
import { selectAllPosts } from './postsSlice';
import { useSelector, useDispatch } from 'react-redux';

const PostsList = () => {
    const posts = useSelector(selectAllPosts)
    

  return (
    <div>
        <h1>POSTS:</h1>
        {posts.map(post => 
            <div key={post.id} style={{ border: '1px solid red', margin: '5px', padding: '6px'}}>
                <p>{post.title}</p>
                <p>{post.content}</p>
            </div>    
        )}
    </div>
  )
}

export default PostsList