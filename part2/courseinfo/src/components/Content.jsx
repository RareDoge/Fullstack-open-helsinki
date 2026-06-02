import Parts from './Parts'

const Content = (props) => (
  <div>
    {props.parts.map(part => (
      <Parts key={part.id} part={part} />
    ))}
  </div>
)

export default Content 