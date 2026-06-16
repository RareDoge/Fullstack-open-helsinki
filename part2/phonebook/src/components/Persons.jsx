
const Persons = ({personsToShow, deletePerson}) => {
    return(
    personsToShow.map(person => 
        <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
        </div>
    )
    )
}

export default Persons