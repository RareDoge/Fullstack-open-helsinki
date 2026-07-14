const mongoose = require('mongoose')

// if(process.argv.length < 4){
//     console.log('include password, name, phone number in arguments')
//     process.exit(1)
// }

const password = encodeURIComponent(process.argv[2])
const url = `mongodb+srv://Raredoge:${password}@cluster0.uqkkbdi.mongodb.net/Phonebook?appName=Cluster0`

   mongoose.set('strictQuery', false)

    mongoose.connect(url, {family: 4})

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

if(process.argv.length > 3){
    const name = process.argv[3]
    const teleNum = process.argv[4]

    const person = new Person({
    name: name,
    number: teleNum
})

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
else{
    Person.find({}).then(persons=>{
        console.log(persons)
        mongoose.connection.close()
    })
}