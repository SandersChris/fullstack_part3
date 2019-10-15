require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())

app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    }).catch(error => {
        console.log(error);
        Response.status(404).end()
    })
  })

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (note) {
            res.json(person.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => {
        return next(error);
    })
})

app.get('/info', (req, res) => {
    const length = persons.length
    const date = new Date()

    res.send(`<p>Phonebook has info for ${length} people<p>
              <p>${date}<p>`)
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'missing name'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'missing number'
        })

    }

    const person = new Person({
        name: body.name,
        number: body.number,
        date: new Date(),
    })
    
    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    }).catch(error => console.log(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
        res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }

app.use(errorHandler)  

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})