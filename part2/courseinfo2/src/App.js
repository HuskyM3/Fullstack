const Headder = (props) => {
 const ncourse = props.course
 console.log('check')
  return (
    <div>
      <h1>{ncourse.name}</h1>
      
    </div>
  )

}

const Content = ({course}) => {
  const inner = course.parts
  const result = inner.map(n => 
    <p key={n.id}> 
    <Part cont = {n} /> 
    </p>)

  return (
    <div>
    {result }
    </div>
  )

}
const Part = ({cont}) => {

const tent = cont
  const innerN = tent.name
  const innerA = tent.exercises
  return (
      <>
        {innerN} {innerA}
      </>
  )
}

const Total = ({course}) => {
  const totals = course.parts.map(n=> n.exercises)
  // jostain syystä Total props ei toimi 
  const sum = totals.reduce((s, p) => s + p,0)
  
  return (
      <p>
      Number of exercises {sum}
      </p>
  )
}



const Course = (props) => {
  const course = props.course
  return (
    <div>
      <Headder course = {course} />
      <Content course = {course} />
      <Total course = {course} />
    </div>

  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    
      <Course course={course} />

  

  
  )
}



export default App
