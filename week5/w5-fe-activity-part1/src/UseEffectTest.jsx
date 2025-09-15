// src/UseEffectTest.jsx
import { useEffect, useState } from 'react';

const UseEffectTest = () => {
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [count, setCount] = useState(0);

  // useEffect with no dependency array
  useEffect(() => {
    console.log('UseEffect1 Ran');
  });

  // useEffect with empty dependency array
  useEffect(() => {
    console.log('UseEffect1 Ran');
  }, []);

  // useEffect with dependencies and conditional logic
  useEffect(() => {
    console.log('UseEffect2 Ran');
    if (toggleTwo) {
      console.log('toggleTwo slice of state is true so this code runs');
    }
  }, [toggleTwo]);

  // useEffect with cleanup function
  useEffect(() => {
    const myInterval = setInterval(() => {
      console.log(`UseEffect3 with interval number ${count} is running`);
    }, 1000);

    return () => {
      console.log(
        `UseEffect3 cleanup ran.\nsetInterval number ${count} is being cleared out`
      );
      clearInterval(myInterval);
    };
  }, [count]);

  return (
    <div>
      {console.log('rendered or re-rendered')}
      <h1>UseEffectTest Component</h1>
      <button onClick={() => setToggleOne(!toggleOne)}>ToggleOne</button>
      <button onClick={() => setToggleTwo(!toggleTwo)}>toggleTwo</button>
      <button onClick={() => setCount(count + 1)}>Count</button>
    </div>
  );
};

export default UseEffectTest;