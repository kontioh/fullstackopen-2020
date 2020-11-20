import React, { useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const OneCountry = ({ country }) => {
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
      <Weather country={country} />
    </div>
  )
}

const Countries = ({ countries, onClickShow }) => {
  return (
    countries.map((c,i) => 
      <div key={i}>{c.name} 
        <button onClick={() => onClickShow(c)}>show</button>
      </div>
    )
  )
}

const CountryView = ({ countries, filter, onClickShow }) => {
  const filtered = countries.filter(c => (c.name.toLowerCase()).includes(filter.toLowerCase()))
  
  if (filtered.length === 0) {
    return <div>No matches.</div>
  } else if (filtered.length > 10) {
    return <div>Too many matches, please specify another filter.</div>
  } else if (filtered.length > 1) {
    return <Countries countries={filtered} onClickShow={onClickShow} />
  } else {
    return <OneCountry country={filtered[0]} />
  }
}

const Filter = ({ filter, handleFilterChange}) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange}/>
    </div> 
  )
}

const Weather = ({ country }) => {
  
  const [ weather, setWeather ] = useState('')
 
  useEffect(() => {
    const params = {access_key: api_key, query: country.capital}
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => { setWeather(response.data) })
  }, [])

  if (weather === '') {
    return <div></div>
  } else {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <div>Temperature: {weather.current.temperature} Celsius</div>
        <img src={weather.current.weather_icons}></img>
        <div>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
      </div>
    )
  }
  
}


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const onFilterUpdate = (event) => setFilter(event.target.value)
  const onClickShow = (country) => setFilter(country.name)

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={onFilterUpdate}
        />
      <CountryView 
        countries={countries} 
        filter={filter}
        onClickShow={onClickShow}/>
    </div>

  )
}

export default App;