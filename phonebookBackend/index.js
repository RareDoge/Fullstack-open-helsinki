const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('displayData', (request) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :displayData'))


let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/info', (request, response) => {
    const numOfNotes = notes.length
    const timeStamp = new Date()
    response.send(`
        <p>Phonebook has info for ${numOfNotes} people</p>
        <p>${timeStamp}</p>`)
});

app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if(note){
        response.json(note)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request,response) => {
    const id = request.params.id
    notes = notes.filter(n => n.id !== id)

    response.send("success").status(204).end()
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1000)
    return String(id)
}

app.post('/api/persons', (request, response) => { 
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    if(notes.find(n => n.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const note = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    notes = notes.concat(note)
    console.log(note)
    response.json(note)
})

app.head('/users', (request, response) => {
  response.status(200).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})