import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import NumberList from './components/NumberList'

const App = () => {
    const [persons, setPersons] = useState([
	{ name: 'Arto Hellas', number: '040-123456', show: true},
	{ name: 'Ada Lovelace', number: '39-44-5323523', show: true},
	{ name: 'Dan Abramov', number: '12-43-234345', show: true},
	{ name: 'Mary Poppendieck', number: '39-23-6423122', show: true}
    ])
    
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilterString] = useState('')

    useEffect(() => {
	let copy = persons.map((person) => {
	    let personCopy = Object.assign({}, person)
	    if (person.name.toLowerCase().search(filterString.toLowerCase()) == -1){
		personCopy.show = false
	    } else {
		personCopy.show = true
	    }
	    return personCopy
	})
	setPersons(copy)
    }, [filterString])

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
	    setPersons(persons.concat(personObject))
	    setNewName("")
	    setNewNumber("")
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
	    <NumberList persons={persons} />
	</div>
    )
}

export default App
