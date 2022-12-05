const x = 1
let y = 5
//console.log(x,y)
y += 10
//console.log(x,y)
y = 'text'
//console.log(x,y)



const t = [1, 2, 3]
t.push(5)

//console.log(t.length)


const t2 = t.concat(5)

const t3 = t2.concat(t2)

//console.log(t3)


const m1 = t.map(value => value*2)
//console.log(m1)

const a1 = [1,2,3, 4]

const [a, b, ...c] = a1

//console.log(a, c)



const object1 = {
    o1: 1,
    o2: 'a',
    name: {
        f1: 'name1',
        f2: 'name2'
    }, 
    arr: [{f1:1, f2:2},2,3,4]
}
//console.log(object1.arr[0].f1)


object1['new'] = 123



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


const Total = (props) => {
    const totals = props.parts
    let sum = 0 
    for (let i = 0; i < 3; i++){
      sum += totals[i].exercises;
    }
    
    return (
        sum
    )
  }  
  console.log(Total(course))

const Headder = (props) => {
    const name = props.name
    return (
        name
    )
  }

console.log(Headder(course))

