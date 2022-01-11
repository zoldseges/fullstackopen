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
	// TODO check if the overwritten phonenumber is not in the phonebook already
	if (found = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
	    if (window.confirm(`Do you want to overwrite ${found.name}'s number from\n` +
                                `${found.number} to ${newPerson.number}`)) {
		personsService.update(found.id, newPerson).then(() => {
		    personsService.getAll().then(fetchedPersons => setPersons(fetchedPersons))

		})
	    }
	} else if (found = persons.find(person => person.number === newPerson.number)){
	    alert(`${found.number} is already assigned to ${found.name}`)
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
	// TODO synchronize client side without refetching (like as we did at adding new number)
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
