import React from 'react';
import Part from './Part';
import { CoursePart } from '../index';

interface ContentProps {
  parts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (props) => {

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Exercises</th>
            <th>Description</th>
            <th>Additional information</th>
          </tr>
        </thead>
        <tbody>
          {props.parts.map(part => <Part key={part.name} part={part} />)}
        </tbody>
      </table>
    </div>
  )
};

export default Content;