import React, { useState, useEffect} from 'react'
import axios from 'axios'

import ListCountries from './components/ListCountries'
import Filter from './components/Filter'
 


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

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={onFilterUpdate}
        />
      <ListCountries 
        countries={countries} 
        filter={filter}/>
    </div>

  )
}

export default App;