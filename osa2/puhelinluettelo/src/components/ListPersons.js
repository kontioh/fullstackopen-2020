import React from 'react'


const Person = ({ person }) => {
    return (
        <div>{person.name} {person.number}</div>
    )
}
    
const ListPersons = ({ persons, filter }) => {
    const filtered = persons.filter(p => (p.name.toLowerCase()).includes(filter.toLowerCase()))
    return (
      <div>
        {filtered.map((person,i) => 
          <Person key={i} person={person} />)}
      </div>
    )
}

export default ListPersons  
