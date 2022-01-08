import React, { useState } from 'react'

const Button = ({variable, handler, text}) => {
    return <button variable={variable} onClick={() => handler(variable + 1)}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
	  <h1>give feedback PlZ</h1>
	  <Button variable={good} handler={setGood} text={"good"} />
	  <Button variable={neutral} handler={setNeutral} text={"neutral"} />
	  <Button variable={bad} handler={setBad} text={"bad"} />
	  <h1>statistics</h1>
	  <p>Good: {good}</p>
	  <p>Neutral: {neutral}</p>
	  <p>Bad: {bad}</p>
    </div>
  )
}

export default App
