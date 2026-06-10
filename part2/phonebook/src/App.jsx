import { useState, useEffect } from 'react'
import axios from 'axios'
import Name from './components/Name'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook , [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      id: persons.length + 1,
      number: newNumber
    }
    if(persons.some(person => person.name === newName))
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  // need to update display as i type into filter
  const personsToShow = (filter === "") ? persons 
  : persons.filter(
    person => person.name.toLowerCase().startsWith(
      filter.toLowerCase() )
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App