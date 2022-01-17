import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import NumberList from './components/NumberList'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilterString] = useState('')
    const [notification, setNotification] = useState(null)    
    useEffect(() => {
	personsService.getAll().then(fetchedPersons => setPersons(fetchedPersons))
    }, [])

    // TODO you still can add the same name twice if we add it from two different running clients
    const handleSubmit = event => {
	event.preventDefault()
	setFilterString('')
	const newPerson = {
	    name: newName,
	    number: newNumber,
	}
	let foundName = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
	let foundNumber = persons.find(person => person.number === newPerson.number)

	// TODO check if the overwritten phonenumber is not in the phonebook already
	if (foundName) {
	    if (window.confirm(`Do you want to overwrite ${foundName.name}'s number from\n` +
                               `${foundName.number} to ${newPerson.number}`)) {
		personsService.update(foundName.id, newPerson).then(() => {
		    personsService.getAll().then(fetchedPersons => setPersons(fetchedPersons))
		    setNotification({ message: `${newPerson.name}'s number is overwritten to ${newPerson.number}`,
				      type: `notification`
				    })
		    setNewName("")
		    setNewNumber("")
		})
	    }
	} else if (foundNumber){
	    setNotification({message: `${foundNumber.number} is already assigned to ${foundNumber.name}`,
			     type: `error`
			    })
	} else {
	    personsService.create(newPerson)
		.then(person => {
		    setPersons(persons.concat(person))
		    setNotification({ message: `${newPerson.name} added with number ${newPerson.number}`,
				      type: `notification`
				    })
		    setNewName("")
		    setNewNumber("")
		})
	}
    }
    
    const deleteHandler = (persons, id) => {
	// TODO synchronize client side without refetching (like as we did at adding new number)
	const person = persons.find(person => person.id === id)
	if (window.confirm(`Do you really want to delete ${person.name}`)) {
	    personsService.remove(id).then(() => {
		personsService.getAll().then(fetchedPersons => setPersons(fetchedPersons))
		setNotification({message: `${person.name} is deleted`,
				 type: `notification`
				})
	    }).catch(error => {
		setNotification({message: `${person.name} was already deleted`,
				 type: `error`
				})
		personsService.getAll().then(fetchedPersons => setPersons(fetchedPersons))
	    })
	}
    }



    return (
	    <div>
	    <h2>Phonebook</h2>
	    <Notification notification={notification} setNotification={setNotification} />
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
