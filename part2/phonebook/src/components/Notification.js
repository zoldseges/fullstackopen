import React from 'react'

const Notification = ({notification, setNotification}) => {

    const errorStyle = {
	color: "red",
	background: "lightgrey",
	fontSize: 20,
	borderStyle: "solid",
	borderRadius: 5,
	padding: 10,
	marginBottom: 10
    }
    
    const msgStyle = {
	color: "green",
	background: "lightgrey",
	fontSize: 20,
	borderStyle: "solid",
	borderRadius: 5,
	padding: 10,
	marginBottom: 10
    }


    if (notification === null) {
	return null
    } else {
	const style = notification.type === "error" ? errorStyle : msgStyle
	setTimeout(() => {
	    setNotification(null)
	}, 3000)
	return (
		<div style={style}>
		{notification.message}
	    </div>
	)
    }
}

export default Notification
