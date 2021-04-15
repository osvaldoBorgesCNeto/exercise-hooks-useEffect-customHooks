import React, { useState } from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

function FavoriteAnimal({name, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={name} onChange={onAnimalChange}/>
    </div>
  )
}

function Display({name, animal}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = useState('');
  const [name, setName] = useState('');
  return (
    <form>
      <Name name={name} onNameChange={(event) => setName(event.target.value)} />
      <FavoriteAnimal name={animal} onAnimalChange={(event) => setAnimal(event.target.value)} />
      <Display name={name} animal={animal} />
    </form>
  )
}

export default App