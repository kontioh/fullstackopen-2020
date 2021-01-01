import React from 'react';

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div>
      <p>Total number of exercises: <strong>{props.total}</strong></p>
    </div>
  )
}

export default Total;