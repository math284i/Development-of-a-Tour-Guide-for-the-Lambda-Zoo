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
  const [ custom, setCustom ] = useState('');
  const [ nrSteps, setNrSteps ] = useState();
  const [ path, setPath ] = useState([]);

  const updateResult = (resultUpdate, nrStepsUpdate, pathUpdate) => {
    setResult(resultUpdate);
    setNrSteps(nrStepsUpdate);
    setPath(pathUpdate);
  }
  const updateInput = (update) => {
    setInput(update);
    //console.log(update);
  }
  const updateSetting = (update) => {
    setSetting(update);
    //console.log(update);
  }
  const updateCustom = (update) => {
    setCustom(update);
    //console.log(update);
  }

  const addSymbolToInput = (symbol) => {
    setInput(prevInput => prevInput + symbol);
    //console.log(input);
  }
  const addSymbolToCustom = (symbol) => {
    setCustom(prevCustom => prevCustom + symbol);
    //console.log(custom);
  }

  return (
    <div className="App">
      <div className="Upper">
        <h1 className="title is-1">Lamda Zoo Tour Guide</h1>
        <div>
          <div>
            <button className="button is-normal is-light" onClick={() => addSymbolToInput("λ")}>λ</button>
          </div>
          <Input value={input} onChange={updateInput} />
        </div>
        <div className="SecondUpper">
          <div className="ButtonDiv" style={{visibility: setting === "Custom" ? 'visible' : 'hidden'}}>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("↙")}>↙</button>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("↘")}>↘</button>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("↓")}>↓</button>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("β")}>β</button>
          </div>
          <Setting label="Reduce using:" setting={setting} value={custom} onSettingChange={updateSetting} onCustomChange={updateCustom} />
          <div className="SecondUpperChild">
            <AppContainer input={input} setting={setting} onClick={updateResult}/>
          </div>
        </div>
      </div>
      <div className="Lower">
        <div className="Result">
          <ReductionSequence path={path} />
        </div>
        <div className="Stats">
          <Stats nrSteps={nrSteps} result={result}/>
        </div>
      </div>
    </div>
  );
}

export default App;
