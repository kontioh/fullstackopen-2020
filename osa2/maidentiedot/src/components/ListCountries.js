import React from 'react'


const Countries = ({ countries }) => {
    if (countries.length > 1) {
      return countries.map((c,i) => <div key={i}>{c.name}</div>)
    } else {
      const country = countries[0]
      return (
        <div>
          <h1>{country.name}</h1>
          <div>Capital: {country.capital}</div>
          <div>Population: {country.population}</div>
          <h2>Languages</h2>
          <ul>
            {country.languages.map((l,i) => <li key={i}>{l.name}</li>)}
          </ul>
          <img src={country.flag} height='120px' ></img>
        </div>
      )
    }
  }

  const ListCountries = ({ countries, filter }) => {
    const filtered = countries.filter(c => (c.name.toLowerCase()).includes(filter.toLowerCase()))
    
    if (filtered.length === 0) {
      return <div>No matches.</div>
    } else if (filtered.length > 10) {
      return <div>Too many matches, please specify another filter.</div>
    } else {
      return <Countries countries={filtered} />
    }
  }

  export default ListCountries