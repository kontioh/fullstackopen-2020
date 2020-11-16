import React from 'react'


const Header = ({ name }) => <h2>{name}</h2>
  
const Content = ({ parts }) => {
    const sum = parts.map(part => part.exercises).reduce((a,b) => a+b)

    return (
        <div>
            {parts.map((part,i) => 
                <p key={i}>{part.name} {part.exercises}</p>)}
            <p><b>Total of {sum} exercises</b></p>
        </div>
    )
}


const Course = ({ course }) => {

    console.log(course)
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}


export default Course