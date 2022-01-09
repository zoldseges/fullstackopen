import React from 'react'

const Form = ({nameOnChange, nameValue, numberOnChange, numberValue, handleSubmit}) => {
    return (
	    <div>
	    <h1>add a new</h1>
	    <form onSubmit={handleSubmit}>
	    <div>
            name:
	    <input
	onChange={nameOnChange}
	value={nameValue}
	    />
	    </div>
	    <div>
            number:
	    <input
	onChange={numberOnChange}
	value={numberValue}
	    />
	    </div>
	    <div>
            <button type="submit">add</button>
	    </div>
	    </form>
            </div>
    )
}

export default Form
