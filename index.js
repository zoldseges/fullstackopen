require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json()) // for parsing
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

const PORT=process.env.PORT

morgan.token('content', (request, response) => {
    if (request.method === 'POST') {
	return JSON.stringify(request.body)
    } else {
	return ""
    }
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
	const date = new Date()
	response.send(`<p>Phonebook has ${persons.length} people</p> <p>${date}</P`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
	response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
	if (person) {
	    response.json(person)
	} else {
	    response.status(404).end()
	}
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => 
      Math.floor(Math.random() * 0x10000000)

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
	return response.status(400).json({
	    error: 'name missing'
	})
    }

    if (!body.number) {
	return response.status(400).json({
	    error: 'number missing'
	})
    }


    const person = new Person({
	name: body.name,
	number: body.number,
    })

    person.save().then(savedPerson => {
	response.json(savedPerson)
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

