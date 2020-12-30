import React, { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [genre, setGenre] = useState('all')

  const booksResult = useQuery(ALL_BOOKS)
  const genresResult = useQuery(ALL_GENRES)
  
  if (!props.show || booksResult.loading || genresResult.loading) {
    return null
  }
  
  let books = booksResult.data.allBooks
  if (genre !== 'all') {
    books = books.filter(b => b.genres.indexOf(genre) !== -1)
  }

  const genres = genresResult.data.allGenres

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <br />
      Select genre
      <select value={genre} onChange={({ target }) => setGenre(target.value)}>
          <option value='all'>all genres</option>
        {genres.map((g,i) => <option key={i} value={g}>{g}</option>)}
      </select>
      

    </div>
  )
}

export default Books