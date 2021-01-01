import React from 'react';

interface ContentProps {
  parts: Array<{ name: string, exerciseCount: number }>;
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Exercise count</th>
          </tr>
        </thead>
        <tbody>
          {props.parts.map(part =>
            <tr key={part.name}>
              <td>{part.name}</td>
              <td>{part.exerciseCount}</td>
            </tr>
            )}
        </tbody>
      </table>
    </div>
  )
};

export default Content;