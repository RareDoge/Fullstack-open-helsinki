import { useState } from "react"

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) =>{
  return(
    <tr>
      <td>
         {text}
      </td>
      <td>
         {value} 
      </td>
    </tr>
  )
}

const DisplayStats = ({good,neut,bad}) =>{
  const total = good + bad + neut
  const avg = (good - bad) / total
  const positive = (good / total)
  if(total !== 0)
  {
  return(
    <table >
      <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neut} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={avg}/>
      <StatisticLine text="positive" value={(positive*100)+"%"}/>
      </tbody>
    </table>
  )
  }
  {
    return(
      <div>
        <p>No feedback Given...</p>
      </div>
    )
  }
}




const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
  }
  const handleBad = () => {
    setBad(bad+1)
  }


  return(
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />
      <h1>Stats:</h1>
      <DisplayStats good={good} neut={neutral} bad={bad}/>
    </div>
    

  )
}



export default App