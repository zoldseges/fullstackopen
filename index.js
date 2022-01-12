const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json()) // for parsing
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

const PORT=3001

morgan.token('content', (request, response) => {
    if (request.method === 'POST') {
	return JSON.stringify(request.body)
    } else {
	return ""
    }
})


let persons = [
    { 
	"id": 1,
	"name": "Arto Hellas", 
	"number": "040-123456"
    },
    { 
	"id": 2,
	"name": "Ada Lovelace", 
	"number": "39-44-5323523"
    },
    { 
	"id": 3,
	"name": "Dan Abramov", 
	"number": "12-43-234345"
    },
    { 
	"id": 4,
	"name": "Mary Poppendieck", 
	"number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const date = new Date()
    let len = persons.length
    response.send(`<p>Phonebook has ${len} people</p> <p>${date}</P`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
	response.json(person)
    } else {
	response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
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

    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
	return response.status(400).json({
	    error: 'name must be unique'
	})
    }

    if (!body.number) {
	return response.status(400).json({
	    error: 'number missing'
	})
    }


    const person = {
	name: body.name,
	number: body.number,
	id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})

app.listen(PORT, () => {
    console
	.log(`Server running on port ${PORT}`)
})

