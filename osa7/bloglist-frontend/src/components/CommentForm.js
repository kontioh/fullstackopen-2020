import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'

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
        <Button size="sm" type='submit'>post comment</Button>
      </form>
    </div>
  )
}

export default CommentForm