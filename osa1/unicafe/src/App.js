import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
  <button onClick={handleClick}>{text}</button>
  )
  }
  
  const StatisticsLine = ({text, value}) => {
  return (
  <p>{text}: {value}</p>
  )
  }
  
  const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
  return (
  <div>
  <h1>Statistics</h1>
  <p>No feedback given</p>
  </div>
  )
  }
  
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positivePercentage = (good / total) * 100
  
  return (
  <div>
  <h1>Statistics</h1>
  <StatisticsLine text="Good" value={good} />
  <StatisticsLine text="Neutral" value={neutral} />
  <StatisticsLine text="Bad" value={bad} />
  <StatisticsLine text="Total" value={total} />
  <StatisticsLine text="Average" value={average} />
  <StatisticsLine text="Positive Percentage" value={positivePercentage + ' %'} />
  </div>
  )
  }
  
  const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
  <div>
  <h1>Give Feedback</h1>
  <Button text="Good" handleClick={() => setGood(good + 1)} />
  <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
  <Button text="Bad" handleClick={() => setBad(bad + 1)} />
  <Statistics good={good} neutral={neutral} bad={bad} />
  </div>
  )
  }
  
  export default App
