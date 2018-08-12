import React from 'react'

export default ( { player }) => {
  const {
    name
  } = player;
  return (
    <div>
      <h1>Player { name }</h1>
    </div>
  );
}
