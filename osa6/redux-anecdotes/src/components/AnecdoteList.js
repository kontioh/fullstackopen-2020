import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const filter = props.filter

  const filteredAndSorted = anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a,b) => b.votes - a.votes)

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(a => a.id === id)
    props.voteAnecdote(votedAnecdote)
    props.setNotification(`You voted '${votedAnecdote.content}'`, 5)
  }

  return (
    <div>
      {filteredAndSorted
      .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
  </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, setNotification }
)(AnecdoteList)