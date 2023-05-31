import React, { useState, useRef, useEffect } from "react";
import { AppContainer } from './AppContainer';
import { Input } from './Input';
import { Setting } from './Setting';
import { Stats } from './Stats';
import './App.css';
import { ReductionSequence } from "./ReductionSequence";

function App() {

  const [ result, setResult ] = useState('');


  const [ input, setInput ] = useState('');
  const inputRef = useRef(null);
  const settingRef = useRef(null);

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
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const value = input.value;
    const newValue = value.substring(0, start) + symbol + value.substring(end);

    setInput(prevInput => newValue);
    setFocus(inputRef);
    //console.log(input);
  }
  const addSymbolToCustom = (symbol) => {
    const input = settingRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const value = input.value;
    const newValue = value.substring(0, start) + symbol + value.substring(end);
    
    setCustom(prevCustom => newValue);
    setFocus(settingRef);
    //console.log(custom);
  }

  function setFocus(ref) {
    ref.current.focus();
  }

  return (
    <div className="App">
      <div className="Upper">
        <h1 className="title is-1">Lamda Zoo Tour Guide</h1>
        <div>
          <div>
            <button className="button is-normal is-light" onClick={() => addSymbolToInput("λ")}>λ</button>
          </div>
          <Input reference={inputRef} value={input} onChange={updateInput} placeHolderText="Enter lambda term" />
        </div>
        <div className="SecondUpper">
          <div className="ButtonDiv" style={{visibility: setting === "Custom" ? 'visible' : 'hidden'}}>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("↙")}>↙</button>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("↘")}>↘</button>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("↓")}>↓</button>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("β")}>β</button>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("∪")}>∪</button>
            <button className="button is-normal is-light" onClick={() => addSymbolToCustom("𝄇")}>𝄇</button>
          </div>
          <Setting label="Reduce using:" setting={setting} reference={settingRef} value={custom} onSettingChange={updateSetting} onCustomChange={updateCustom} />
          <div className="SecondUpperChild">
            <AppContainer input={input} custom={custom} setting={setting} onClick={updateResult}/>
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
