import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const BirthyearForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const result = useQuery(ALL_AUTHORS)

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        name
        <select value={name} onChange={({ target }) => setName(target.value)}>
         <option value=''></option>
          {result.data.allAuthors.map((a,i) => <option key={i} value={a.name}>{a.name}</option>)}
        </select>
        <div>
          born<input type='number' value={born} onChange={({ target }) => setBorn(Number(target.value))} />  
        </div>
        <div>
          <button type='submit'>update author</button>
        </div>
      </form>
    </div>
  )
}

export default BirthyearForm