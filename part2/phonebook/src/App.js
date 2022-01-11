import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import NumberList from './components/NumberList'
import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilterString] = useState('')

    useEffect(() => {
	personsService.getAll().then(fetchedPersons => setPersons(fetchedPersons))
    }, [])

    const handleSubmit = event => {
	let found
	event.preventDefault()
	setFilterString('')
	const newPerson = {
	    name: newName,
	    number: newNumber,
	}
	if (persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
	    alert(`${newName} is already added to phonebook`)
	} else if (found = persons.find(person => person.number === newPerson.number)){
	    alert(`${newNumber} is already added to phonebook for ${found.name}`)
	} else {
	    personsService.create(newPerson)
		.then(person => {
		    setPersons(persons.concat(person))
		    setNewName("")
		    setNewNumber("")
		})
	}
    }
    
    const deleteHandler = (persons, id) => {
	const person = persons.find(person => person.id == id)
	if (window.confirm(`Do you really want to delete ${person.name}`)) {
	    personsService.remove(id).then(() => {
		personsService.getAll().then(fetchedPersons => setPersons(fetchedPersons))
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
	    <NumberList persons={persons} filterString={filterString} deleteHandler={deleteHandler} />
	    </div>
    )
}

export default App
