import React from 'react'
import blogService from '../services/blogs'
import { useState, useEffect } from 'react'

const Comment = ({ comment }) => (
  <li>{comment}</li>
)

const Comments = ({ blogId }) => {

  const [comments, setComments] = useState([])

  useEffect(() => {
    let isMounted = true
    blogService.getComments(blogId).then(result => {
      if (isMounted) setComments(result.comments)
    })
    return () => isMounted = false
  },[blogId, comments])

  return (
    <div>
      <h3>Comments</h3>
        {comments.length > 0
          ? <ul>{comments.map(comment => <Comment key={comment.id} comment={comment.text} />)}</ul>
          : <div><i>no comments yet</i></div>
        }
    </div>
  )
}

export default Comments