import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import ListPersons from './components/ListPersons'
import PersonForm from './components/PersonForm'
import personService from './services/PersonService'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
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
          })
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={onFilterUpdate}/>

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
        handleDelete={handleDelete}/>
    </div>
  )
}

export default App