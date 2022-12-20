const Headder = ({course}) => {
    //console.log('header')
    return (
        <h2>{course}</h2>
    )
  
  }
  
  const Content = ({course}) => {
    const result = course.map(n => 
      <Part key={n.id} cont = {n} /> )
      //console.log('content')
    return (
      <>
      {result }
      </>
    )
  
  }
  const Part = ({cont}) => {
  //console.log('part')
    return (
        <p>
          {cont.name} {cont.exercises}
        </p>
    )
  }
  

//sdfa 
  const Total = ({course}) => {
    const sum = course.reduce((s, p) => s + p.exercises,0)
    //console.log('total')
    return (
        <b>
         total of {sum} exercises
        </b>
    )
  }
  
  
  
  
  
  const Course = ({course}) => {
    //console.log('toimii')
    return (
      <div>
        <Headder course={course.name} />
        <Content course = {course.parts} />
        <Total course = {course.parts} />
      </div>
  
    )
  }
  
  export default Course