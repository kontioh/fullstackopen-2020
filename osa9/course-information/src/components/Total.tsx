import React from 'react';

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = (props) => {
  return <h3>Total number of exercises: {props.total}</h3>;
}

export default Total;