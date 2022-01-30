const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('Please provide a number for the person')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@fullstackopen.wfqxa.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
	console.log("persons:")
	result.forEach(result => {
	    console.log(`${result.name}: ${result.number}`)
	})
	mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    let person = new Person({
	name: process.argv[3],
	number: process.argv[4]
    })
    person.save().then(result => {
	console.log(`${person.name} added with number ${person.number}`)
	mongoose.connection.close()
    })
}
