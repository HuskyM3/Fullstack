const Headder = (props) => {
 const ncourse = props.course
  return (
    <div>
      <p>
      <h1>{ncourse.name}</h1>
      </p>
    </div>
  )

}

const Content = (props) => {
  const inner = props.parts.parts
  return (
    <div>
      <Part n = {inner[0]} e = {inner[0]}/>
      <Part n = {inner[1]} e = {inner[1]}/>
      <Part n = {inner[2]} e = {inner[2]}/>
    </div>
  )

}
const Part = (props) => {
  const innerN = props.n.name
  const innerA = props.e.exercises
  return (
    <div>
      <p>
        {innerN} {innerA}
      </p>
    </div>
  )
}

const Total = (props) => {
  const totals = props.parts.parts
  let sum = 0 
  for (let i = 0; i < 3; i++){
    sum += totals[i].exercises;
  }
  return (
    <div>
      <p>
      Number of exercises {sum}
      </p>
    </div>
  )
}



function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Headder course={course} />
      <Content parts = {course} /> 
      <Total parts = {course} />
    </div>
  )
}

export default App
