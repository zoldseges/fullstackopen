import React from 'react'

const Total = ({parts}) => {
    return (
	    <p><b>total of {parts.reduce((s, p) => s + p.exercises,0)} exercises</b></p>
    )
}

export default Total
