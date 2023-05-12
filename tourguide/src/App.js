import { useState } from "react";
import { AppContainer } from './AppContainer';
import { Input } from './Input';
import { Setting } from './Setting';
import { Stats } from './Stats';
import './App.css';
import { ReductionSequence } from "./ReductionSequence";

function App() {

  const [ result, setResult ] = useState('');
  const [ input, setInput ] = useState('');
  const [ setting, setSetting ] = useState('CBN');
  const [ nrSteps, setNrSteps ] = useState();
  const [ determinism, setDeterminism ] = useState('');

  const updateResult = (resultUpdate, nrStepsUpdate, determinismUpdate) => {
    setResult(resultUpdate);
    setNrSteps(nrStepsUpdate);
    setDeterminism(determinismUpdate);
  }
  const updateInput = (update) => {
    setInput(update);
    //console.log(update);
  }
  const updateSetting = (update) => {
    setSetting(update);
    //console.log(update);
  }

  const addSymbol = (symbol) => {
    setInput(prevInput => prevInput + symbol);
    //console.log(input);
  }

  return (
    <div className="App">
      <div className="Upper">
        <h1 className="title is-1">Lamda Zoo Tour Guide</h1>
        <div>
          <div className="ButtonsDiv">
            <button className="button is-normal is-light" onClick={() => addSymbol("λ")}>λ</button>
            <button className="button is-normal is-light" onClick={() => addSymbol("↙")}>↙</button>
            <button className="button is-normal is-light" onClick={() => addSymbol("↘")}>↘</button>
            <button className="button is-normal is-light" onClick={() => addSymbol("↓")}>↓</button>
            <button className="button is-normal is-light" onClick={() => addSymbol("β")}>β</button>
          </div>
          <Input value={input} onChange={updateInput} />
        </div>
        <div className="SecondUpper">
          <Setting label="Reduce using:" setting={setting} onChange={updateSetting} />
          <div className="SecondUpperChild">
            <AppContainer input={input} setting={setting} onClick={updateResult}/>
          </div>
        </div>
      </div>
      <div className="Lower">
        <div className="Result">
          <ReductionSequence />
        </div>
        <div className="Stats">
          <Stats nrSteps={nrSteps} determinism={determinism} result={result}/>
        </div>
      </div>
    </div>
  );
}

export default App;
