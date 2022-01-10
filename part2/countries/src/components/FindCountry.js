import React from 'react'

const FindCountry = ({value, onChange}) => {
    return (
	    <div>
	    search countries:
	    <input
	value={value}
	onChange={onChange}
	    />
	    </div>
    )
}

export default FindCountry
