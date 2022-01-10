import React from 'react'

const NumberList = ({persons, filterString}) => {
    const filteredPersons = persons.filter(person =>
					   person.name.toLowerCase().
					   search(filterString.toLowerCase()) != -1)
    return (
	    <div>
	    <h2>Numbers</h2>
	    {filteredPersons.
	     map(person => <div key={person.name}>{person.name}: {person.number}</div>)}
	</div>
    )
}

export default NumberList

