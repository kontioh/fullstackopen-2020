import React from 'react';
import { CoursePart } from '../index';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = (props) => {

  const part = props.part;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case 'Fundamentals':
      return (
        <tr>
          <td>{part.name}</td>
          <td>{part.exerciseCount}</td>
          <td><i>{part.description}</i></td>
          <td></td>
        </tr>
      );
    case 'Using props to pass data':
      return (
        <tr>
          <td>{part.name}</td>
          <td>{part.exerciseCount}</td>
          <td></td>
          <td>Group project count: {part.groupProjectCount}</td>
        </tr>
      );
    case 'Deeper type usage':
      return (
        <tr>
          <td>{part.name}</td>
          <td>{part.exerciseCount}</td>
          <td><i>{part.description}</i></td>
          <td><div>Exercise submission link:</div>{part.exerciseSubmissionLink}</td>
        </tr>
      );
    case 'To infinity and beyond':
      return (
        <tr>
          <td>{part.name}</td>
          <td>{part.exerciseCount}</td>
          <td><i>{part.description}</i></td>
          <td>Course book: {part.courseBook}</td>
        </tr>
      );
    default:
      assertNever(part);
      return null;
  }
};

export default Part;