import React from 'react'
import { GET_ME, ALL_BOOKS } from '../queries' 
import { useQuery } from '@apollo/client'

const Recommendations = ({ show }) => {

  const userResult = useQuery(GET_ME)
  const favoriteGenre = userResult.data?.me?.favoriteGenre
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre},
  })

  if (!show || userResult.loading || bookResult.loading) {
    return null
  }

  const books = bookResult.data?.allBooks
  
  return (
    <div>
      <h2>recommendations</h2>

      <div>books in your favorite genre <strong>{favoriteGenre}:</strong></div>

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
    </div>
  )
}

export default Recommendations