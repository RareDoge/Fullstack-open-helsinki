import { useState, useEffect } from 'react'
import axios from 'axios'
import Name from './components/Name'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import services from './services/people.js'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setNewMessage] = useState(null)
  const [msgType, setMsgType] = useState(null)

  const URL = 'http://localhost:3001/api/persons'

  const hook = () => {
    services.getAll()
      .then(response => {setPersons(response)})
  }
  useEffect(hook , [])

  const addName = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newName))
    {
      if(window.confirm(`Update number for ${newName}?`))
      {
        const targetPerson = persons.find(person => person.name === newName)

        const updateNum = {
        ...targetPerson,
        number: newNumber
      }

      services.update(targetPerson.id, updateNum)
        .then(returnedPerson =>{
          setPersons(persons.map(person => person.id === targetPerson.id ? returnedPerson : person))
      })
    }
    }
    else
    {
    const nameObject = {
      name : newName,
      number: newNumber,
    }
    services.create(nameObject).then(
      response => {
        setPersons(persons.concat(response))
        setMsgType('success')
        setNewMessage(`Added ${newName}`)
      }
    ).catch(error => {
      setMsgType('error')
      setNewMessage(error.response.data.error)
    })
    setTimeout(() => {
      setNewMessage(null)
      setMsgType(null)
    }, 5000);
    }
    setNewName('')
    setNewNumber('')
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

  const deletePerson = (id) => {
    const name = persons.find(name => name.id === id)
      if(window.confirm(`Confirm Delete ${name.name}?`))
      {
        services.remove(id)
        setPersons(persons.filter(person => person.id !== id))
      }
      else{
        console.log("okay...")
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} msgType={msgType}/>
      <Filter handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App