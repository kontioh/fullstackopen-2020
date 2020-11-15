import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const MostVotes = ({ votes, anecdotes }) => {
  let maxIdx = 0
  for (let i = 0; i < anecdotes.length; i ++) {
    if (votes[i] > votes[maxIdx]) maxIdx = i
  }

  return (
    <div>
      {anecdotes[maxIdx]}
      <div>
      has {votes[maxIdx]} votes
    </div>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const clickNext = () => {
    const idx = Math.floor(Math.random()*anecdotes.length)
    setSelected(idx)
  }

  const clickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <button onClick={clickVote}>vote</button>
        <button onClick={clickNext}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={props.anecdotes}/>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
