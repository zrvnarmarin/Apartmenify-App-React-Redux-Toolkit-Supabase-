import React from 'react'
import { useDispatch } from 'react-redux'
import { addReaction } from './postsSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️️'
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button 
                key={name} 
                type="button" 
                onClick={() => dispatch(addReaction({ postId: post.id, reaction: name}))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })
  
    return (
        <div>{reactionButtons}</div>
    )
}

export default ReactionButtons