import Header from './Header'
import Parts from './Parts'
import Content from './Content'
import Total from './Total'

const Course = ({course, key}) => {
    const totalEx = course.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)
    return(
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total total = {totalEx}/>
        </div>
    )
}

export default Course