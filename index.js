const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

let persons = [
    {
        name: 'Arto Hellas',
        number: '112-333-2222',
        date: new Date(),
        id: 1,
    },
    {
        name: 'Chris Sanders',
        number: '555-555-5555',
        date: new Date(),
        id: 2,
    },
    {
        name: 'James Mcavoy',
        number: '444-444-4444',
        date: new Date(),
        id: 3,
    },
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    person = persons.find(person => person.id === id)

    if (person)
        res.json(person)
    else 
        res.status(404).end()
})

app.get('/info', (req, res) => {
    const length = persons.length
    const date = new Date()

    res.send(`<p>Phonebook has info for ${length} people<p>
              <p>${date}<p>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.use(bodyParser.json())

const generateId = () => 
    Math.floor((Math.random() * 1000) + 1)

const found = (search) => {
    const names = persons.map(person => person.name)

    return names.find(name => search === name)

}

app.post('/api/persons', (req, res) => {
    body = req.body

    if (found(body.name) !== undefined) {
        return res.status(400).json({
            error: 'name already used'
        })
    }

    if (!body.name) {
        return res.status(400).json({
            error: 'missing number'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'missing number'
        })

    }

    const person = {
        name: body.name,
        number: body.number,
        date: new Date(),
        id: generateId()
    }
    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})