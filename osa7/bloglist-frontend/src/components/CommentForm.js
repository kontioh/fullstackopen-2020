import React, { useState } from 'react'
import blogService from '../services/blogs'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')

  const addComment = async (event) => {
    event.preventDefault()
    try {
      await blogService.newComment({ text: comment }, blogId)
      setComment('')
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h3>New comment</h3>
      <form onSubmit={addComment}>
        <input
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}></input>
        <button type='submit'>post comment</button>
      </form>
    </div>
  )
}

export default CommentForm