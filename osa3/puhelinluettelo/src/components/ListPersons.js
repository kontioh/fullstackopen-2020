import React from 'react'


const Person = ({ person, handleDelete }) => {
    return (
        <div>
          {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
        </div>
    )
}
    
const ListPersons = ({ persons, filter, handleDelete }) => {
    const filtered = persons.filter(p => (p.name.toLowerCase()).includes(filter.toLowerCase()))
    return (
      <div>
        {filtered.map((person,i) => 
          <Person key={i} person={person} handleDelete={handleDelete} />)}
      </div>
    )
}

export default ListPersons  
