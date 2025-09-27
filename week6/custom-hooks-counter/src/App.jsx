import { useState } from 'react';
import useField from './useField';
import useLocalStorage from './useLocalStorage';
import SingleCounter from './SingleCounter';  // Import the SingleCounter component
import './App.css';  // Import styles for the app

const App = () => {
  const [counter, setCounter] = useState(0);
  const [name, setName] = useLocalStorage('name', '');
  const [born, setBorn] = useLocalStorage('born', '');
  const [height, setHeight] = useLocalStorage('height', '');

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission logic here
    console.log('Submitted:', { name, born, height });
  };

  return (
    <div className="app-container">
      <SingleCounter />
      <SingleCounter />
      <SingleCounter />
      
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            Name: 
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Your name is stored in localStorage: {name}</p>
          </div>
          <br />
          <div>
            Birthdate: 
            <input
              type="date"
              value={born}
              onChange={(e) => setBorn(e.target.value)}
            />
            <p>Your birthdate is stored in localStorage: {born}</p>
          </div>
          <br />
          <div>
            Height: 
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <p>Your height is stored in localStorage: {height}</p>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>s      
      </div>
    </div>
  );
};

export default App;