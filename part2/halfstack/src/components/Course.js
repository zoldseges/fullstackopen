import React from 'react'
import Header from './course/Header'
import Content from './course/Content'
import Total from './course/Total'

const Course = ({course}) => {
    return (
	    <>
	    <Header name={course.name} />
	    <Content parts={course.parts} />
	    <Total parts={course.parts} />
	    </>
    )
}

export default Course
