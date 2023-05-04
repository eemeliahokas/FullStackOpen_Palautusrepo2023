const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => 
          <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce( (s, p) => {
    return s + p.exercises;
  }, 0)
  return (
    <div>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}


export default Course;