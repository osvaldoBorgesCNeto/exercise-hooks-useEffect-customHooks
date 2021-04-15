import React, { useEffect, useState } from 'react';

function Greeting({ initialName = '' }) {
  const newName = window.localStorage.getItem('name') || initialName;
  const [name, setName] = useState(newName);

  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
