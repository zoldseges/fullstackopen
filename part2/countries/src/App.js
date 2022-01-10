import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'
import Results from './components/Results'

function App() {
    const [countries, setCountries] = useState([])
    const [findString, setFindString] = useState("")
    const [countiesShowIndex, setCountriesShowIndex] = useState([])

    useEffect (() => 
	       axios
	       .get('https://restcountries.com/v3.1/all')
	       .then(response => setCountries(response.data))
	       , [])

    return (
	    <div>
	    <FindCountry value={findString} onChange={event => setFindString(event.target.value)} />
	    <Results filterString={findString} countries={countries} />
	    </div>
    )
}

export default App;
