import { useState } from "react";
import { AppContainer } from './AppContainer';
import { Input } from './Input';
import { Setting } from './Setting';
import './App.css';

function App() {

  const [ result, setResult ] = useState('');
  const [ input, setInput ] = useState('');
  const [ setting, setSetting ] = useState('LCBW');

  const updateResult = (update) => {
    setResult(update);
    console.log(update);
  }
  const updateInput = (update) => {
    setInput(update);
    console.log(update);
  }
  const updateSetting = (update) => {
    setSetting(update);
    console.log(update);
  }

  return (
    <div className="App">
      <div className="Upper">
        <h1 className="title">Lamda Zoo Tour Guide</h1>
        <Input value={input} onChange={updateInput} />
        <div className="SecondUpper">
          <Setting label="Reduce using:" onChange={updateSetting} />
          <div className="SecondUpperChild">
            <AppContainer onClick={updateResult}/>
          </div>
        </div>
      </div>
      <div className="Lower">
        <div className="Result">
          <h2>Dyberg dum</h2>
        </div>
        <div className="Stats">
          <h2>Dyberg dum</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
