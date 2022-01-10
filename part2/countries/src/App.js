import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'
import Result from './components/Result'

const App = () => {
    const [countries, setCountries] = useState([])
    const [findString, setFindString] = useState("")
    const [countriesShowIndexes, setCountriesShowIndexes] = useState([])
    useEffect (() => 
	       axios
	       .get('https://restcountries.com/v3.1/all')
	       .then(response => setCountries(response.data))
	       , [])

    useEffect (() => {
	var indexes = []
	for (let i = 0; i < countries.length; i++) {
	    if(countries[i].name.common.toLowerCase().
	       match(findString.toLowerCase())) {
		indexes.push(i)
	    }
	}
	setCountriesShowIndexes(indexes)
    }, [findString])
    
    return (
	    <div>
	    <FindCountry value={findString} onChange={event => setFindString(event.target.value)} />
	    <Result
	countries={countries}
	countriesShowIndexes={countriesShowIndexes}
	setCountriesShowIndexes={setCountriesShowIndexes}
	    />
	    </div>
    )
}

export default App;
