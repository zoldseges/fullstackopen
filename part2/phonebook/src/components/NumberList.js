import React from 'react'

const NumberList = ({persons, filterString, deleteHandler}) => {
    const filteredPersons = persons.filter(person =>
	person.name.toLowerCase()
	    .match(filterString.toLowerCase()))
    return (
	<div>
	    <h2>Numbers</h2>
	    <table>
		<tbody>
		    {filteredPersons
		     .map(person => <tr key={person.id}>
					<td>{person.name}:</td>
					<td>{person.number}</td>
					<td>
					    <button onClick={() => deleteHandler(persons, person.id)}>
						delete
					    </button>
					</td>
				    </tr>)}
		</tbody>
	    </table>
	</div>
    )
}

export default NumberList

