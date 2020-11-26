import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import ListPersons from './components/ListPersons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/PersonService'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }

    if (persons.map(p => p.name).includes(newName)) {
      handleUpdate(personObject)
    } else {
      personService
        .create(personObject)
          .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${createdPerson.name}`)
          setMessageType('success')
          setTimeout(() => { setMessage(null)}, 5000)
        })
        .catch((error) => {
          setMessage(error.response.data.error)
          setMessageType('error')
          setTimeout(() => { setMessage(null)}, 5000)
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const onFilterUpdate = (event) => setFilter(event.target.value)
  
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log('delete ', person.name)
      personService
        .del(person.id)
          .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage(`Deleted ${person.name}`)
          setMessageType('success')
          setTimeout(() => { setMessage(null)}, 5000)
          })
    }
  }

  const handleUpdate = (person) => {
    const id = persons.find(p => p.name === newName).id
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(id, person)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Updated the number of ${returnedPerson.name}`)
            setMessageType('success')
            setTimeout(() => { setMessage(null)}, 5000)
          })
          .catch(error => {
            console.log(error)
            console.log(`The person ${person.name} was already deleted from server.`)
            setMessage(`Information of ${person.name} has already been removed from server`)
            setMessageType('error')
            setTimeout(() => { setMessage(null)}, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message} 
        messageType={messageType}
        />
      <Filter 
        filter={filter} 
        handleFilter={onFilterUpdate}
        />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <ListPersons 
        persons={persons} 
        filter={filter} 
        handleDelete={handleDelete}
        />
    </div>
  )
}

export default App