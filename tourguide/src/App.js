import { useState } from "react";
import { AppContainer } from './AppContainer';
import './App.css';

function App() {

  const [ result, setResult ] = useState('');

  const updateResult = (update) => setResult(update);

  return (
    <div className="App">
       <AppContainer onClick={updateResult}/>
    </div>
  );
}

export default App;
