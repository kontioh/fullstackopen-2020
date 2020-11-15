import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({ text }) => <h1>{text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = ({ text, value, endChar}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {endChar}</td>
    </tr>
  )
  
}

const Statistics = (props) => {
  const [good,neutral,bad] = [props.good, props.neutral, props.bad]
  const all = good + neutral + bad

  if (all < 1) {
    return <div>No feedback given.</div>
  }

  const average = (good - bad)/all
  const positive = 100 * good/all

  return (
    <table>
      <tbody>
        <StatisticsLine text='good' value={good} />
        <StatisticsLine text='neutral' value={neutral} />
        <StatisticsLine text='bad' value={bad} />
        <StatisticsLine text='all' value={all} />
        <StatisticsLine text='average' value={average} />
        <StatisticsLine text='positive' value={positive} endChar=' %' />
      </tbody>
    </table>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () =>  setGood(good + 1)
  const handleNeutral = () =>  setNeutral(neutral + 1)
  const handleBad = () =>  setBad(bad + 1)

  return (
    <div>
      <Header text='Give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <Header text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
