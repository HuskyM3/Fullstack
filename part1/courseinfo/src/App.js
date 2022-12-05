const Headder = (props) => {
  return (
    <div>
      <p>
      <h1>{props.course}</h1>
      </p>
    </div>
  )

}

const Content = (props) => {
  return (
    <div>
      <Part b = {props.p1} c = {props.e1}/>
      <Part b = {props.p2} c = {props.e2}/>
      <Part b = {props.p3} c = {props.e3}/>
    </div>
  )

}
const Part = (props) => {
  return (
    <div>
      <p>
        {props.b} {props.c}
      </p>
    </div>
  )

}

const Total = (props) => {
  return (
    <div>
      <p>
      Number of exercises {props.totals}
      </p>
    </div>
  )
}



function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Headder course={course} />
      <Content p1 = {part1} e1 = {exercises1} p2 = {part2} e2 = {exercises2} p3 = {part3} e3 = {exercises3}/>
      <Total totals = {exercises1 +  exercises2 + exercises3} />
    </div>
  )
}

export default App
