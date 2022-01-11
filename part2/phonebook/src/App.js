import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import NumberList from './components/NumberList'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilterString] = useState('')

    useEffect(() => {
	axios
	    .get('http://localhost:3001/persons')
	    .then(response => setPersons(response.data))
    }, [])

    const handleSubmit = event => {
	let found
	event.preventDefault()
	setFilterString('')
	const personObject = {
	    name: newName,
	    number: newNumber,
	    show: true,
	}
	if (persons.find(person => person.name == personObject.name)) {
	    alert(`${newName} is already added to phonebook`)
	} else if (found = persons.find(person => person.number == personObject.number)){
	    alert(`${newNumber} is already added to phonebook for ${found.name}`)
	} else {
	    axios.post('http://localhost:3001/persons', personObject)
		.then(response => {
		    console.log(response)
		    setPersons(persons.concat(response.data))
		    setNewName("")
		    setNewNumber("")
		})
	}
    }
    
    return (
	    <div>
	    <h2>Phonebook</h2>
	    <Filter value={filterString} onChange={event => setFilterString(event.target.value)} />
	    <Form
	nameValue={newName}
	nameOnChange={event => setNewName(event.target.value)}
	numberValue={newNumber}
	numberOnChange={event => setNewNumber(event.target.value)}
	handleSubmit={handleSubmit}
	    />
	    <NumberList persons={persons} filterString={filterString} />
	    </div>
    )
}

export default App
