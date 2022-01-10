import React from 'react'

const ResultCountry = ({country}) => {
    return (
	    <div>
	    <h1>{country.name.common}</h1>
	    <div>
	    <table>
	    <tbody>
	    <tr>
	    <td>capital:</td>
	    <td>{country.capital}</td>
	    </tr>
	    <tr>
	    <td>population:</td>
	    <td>{country.population}</td>
	    </tr>
	    </tbody>
	    </table>
	    </div>
	    <h3>languages</h3>
	    <ul>
	    {Object.values(country.languages).map((language, id) => <li key={id}>{language}</li>)}
	</ul>
	    <img src={country.flags.png}></img>
	    </div>
    )
}


const ResultList = ({countries, countriesShowIndexes, setCountriesShowIndexes}) => {
    return (
	    <div>
	    {countriesShowIndexes.map((index, id) =>
				      <div key={id}>
				      {countries[index].name.common}
				      <button onClick={() => setCountriesShowIndexes([index])}>show</button>
				      </div>
				     )}
	</div>
    )
}

const Result = ({countries, countriesShowIndexes, setCountriesShowIndexes}) => {
    if (countries.length == 0) {
	return (
		<div>
		Loading...
		</div>
	)
    }

    if(countriesShowIndexes.length == 0) {
	return (
		<div>
		No match.
		</div>
	)
    }
    
    if(countriesShowIndexes.length == 1) {
	return (
		<ResultCountry country={countries[countriesShowIndexes[0]]} />
	)

    }
    if(countriesShowIndexes.length <= 10) {
	return (
		<ResultList
	    countries={countries}
	    countriesShowIndexes={countriesShowIndexes}
	    setCountriesShowIndexes={setCountriesShowIndexes}
		/>
	)
    }
    else {
	return (
		<div>
		Too many matches. Try to specify it more.
		</div>
	)
    }
}

export default Result
