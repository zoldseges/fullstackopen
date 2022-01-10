import React, {useState, useEffect} from 'react'
import axios from 'axios'

const imgStyle = {
    border: "1px solid",
    color: "black",
}

const degToDir = (deg) => {
    if (deg >= 22.5 && deg < 67.5) return "NE"
    if (deg >= 67.5 && deg < 112.5) return "E"
    if (deg >= 112.5 && deg < 157.5) return "SE"
    if (deg >= 157.5 && deg < 202.5) return "S"
    if (deg >= 202.5 && deg < 247.5) return "SW"
    if (deg >= 247.5 && deg < 292.5) return "W"
    if (deg >= 292.5 && deg < 337.5) return "NW"
    else return "N"
}

const WeatherInfo = ({weatherData}) => {
    if (!weatherData) {
	return (
		<div>
		Loading...
		</div>
	)
    } else {
	return (
		<div>
		<div>
		<img
	    src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
	    width="70"
	    height="auto"
		/>
		</div>
		<div>
		temp: {`${weatherData.main.temp} °C`}<br />
		wind: {(weatherData.wind.speed * 3.6).
		       toLocaleString(
			   undefined,
			   {minimumFractionDigits: 2,
			    maximumFractionDigits: 2})} km/h
	    from {degToDir(weatherData.wind.deg)}
	    </div>
		</div>
	)
    }
}

const Weather = ({capital}) => {
    const [weatherData, setWeatherData] = useState()
    const api_key = process.env.REACT_APP_API_KEY

    useEffect (() => 
	       axios
	       .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
	       .then(response => setWeatherData(response.data))
	       , [])

    return (	
	    <div>
	    <h2>Weather in {capital}</h2>
	    <WeatherInfo weatherData={weatherData} />
	    </div>
    )
}

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
	    <img
	src={country.flags.png}
	style={imgStyle}
	width="100"
	height="auto"
	    />
	    <Weather capital={country.capital} />
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
