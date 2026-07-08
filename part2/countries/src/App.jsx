import { useState, useEffect } from 'react'
import axios from 'axios'
import List from './components/List'


const App = () => {
  const[value, setNewValue] = useState('')
  const[countries, setNewCountries] = useState([])

  const handleValueChange = (event) => {
    setNewValue(event.target.value)
  }

  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setNewCountries(response.data)
      })
  }, [])
  
  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  )

  return(
    <div>
      <form>
        input countries <input value={value} onChange={handleValueChange}/>
      </form>
      <List countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App
