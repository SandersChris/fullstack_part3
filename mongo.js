const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Expected usage: password')
    process.exit(1)
}

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Expected usage: password name number')
    process.exit(2)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0-d9vuc.azure.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
    date: new Date(),
})

if (process.argv.length === 5) {
person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
}).catch(error => {
    console.log(error)
})
}

if (process.argv.length === 3) {
Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  }).catch(error => {
      console.log(error)
  })
}