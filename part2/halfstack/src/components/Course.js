import React from 'react'
import Header from './course/Header'
import Content from './course/Content'

const Course = ({course}) => {
    console.log(course)
    return (
	    <div>
	    <Header name={course.name} />
	    {course.parts.map(part => 
			      <Content key={part.id} part={part} />
			     )}
	    </div>
    )
}

export default Course
