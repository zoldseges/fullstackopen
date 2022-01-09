import React from 'react'

const NumberList = ({persons}) => {
    return (
	<div>
	    <h2>Numbers</h2>
	    {persons.
	     filter(person => person.show).
	     map(person => <div key={person.name}>{person.name}: {person.number}</div>)}
	</div>
    )
}

export default NumberList

