const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url = `mongodb+srv://Raredoge:${password}@cluster0.oiur7ug.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Notes', noteSchema)

const note = new Note({
  content: 'CSS is hard',
  important: false,
})

// note.save().then(result =>{
//     console.log('note Saved')
//     mongoose.connection.close()
// })

Note.find({important: false}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
  mongoose.connection.close()
})

