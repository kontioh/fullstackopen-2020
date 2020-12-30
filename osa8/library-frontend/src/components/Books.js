import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const [genre, setGenre] = useState('')

  const allBooksResult = useQuery(ALL_BOOKS)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks()
  }, []) // eslint-disable-line
  
  if (!props.show) {
    return null
  }
  
  const books = booksResult.data?.allBooks
    ? booksResult.data.allBooks
    : allBooksResult.data?.allBooks

  let genres = allBooksResult.data?.allBooks?.flatMap(b => b.genres)
  genres = [...new Set(genres)]

  const handleGenreChange = (genre) => {
    setGenre(genre)
    getBooks({ variables: { genre: genre } })
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
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
      <select value={genre} onChange={({ target }) => handleGenreChange(target.value)}>
          <option value=''>all genres</option>
        {genres.map((g,i) => <option key={i} value={g}>{g}</option>)}
      </select>
    </div>
  )
}

export default Books