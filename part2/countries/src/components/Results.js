import React from 'react'

const Result = ({country}) => {
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

const matchIndex = (filterString, countries) => {
    var indexes = []
    for (let i = 0; i < countries.length; i++) {
	if(countries[i].name.common.toLowerCase().
	   match(filterString.toLowerCase())) {
	    indexes.push(i)
	}
    }
    return indexes
}


const Results = ({filterString, countries}) => {
    if (countries.length == 0) {
	return (
		<div>
		Loading...
		</div>
	)
    }
    const indexes = matchIndex(filterString, countries)
    if(indexes.length == 0) {
	return (
		<div>
		No match.
		</div>
	)
    }
    
    if(indexes.length == 1) {
	return (
		<Result country={countries[indexes[0]]} />
	)

    }
    if(indexes.length <= 10) {
	return (
		<div>
		{indexes.map((index, id) => <div key={id}>{countries[index].name.common}</div>)}
	    </div>
	)
    }
    else {
	return (
		<div>
		Too many matches. Try specify it more.
		</div>
	)
    }
}

export default Results
