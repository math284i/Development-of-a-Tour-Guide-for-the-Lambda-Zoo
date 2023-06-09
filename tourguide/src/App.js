import React, { useState, useRef } from "react";
import { AppContainer } from './AppContainer';
import { Input } from './Input';
import { Setting } from './Setting';
import { Stats } from './Stats';
import './App.css';
import { ReductionSequence } from "./ReductionSequence";

function App() {
  const strategies = ["CBN", "LCBW", "RCBW", "LOW", "Custom"];

  const [ result, setResult ] = useState('');
  const [ input, setInput ] = useState('');

  const inputRef = useRef(null);
  const settingRef = useRef(null);

  const [ setting, setSetting ] = useState(strategies[0]);
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
  }

  const updateSetting = (update) => {
    setSetting(update);
  }

  const updateCustom = (update) => {
    setCustom(update);
  }

  const addSymbolToInput = (symbol) => {
    addSymbols(symbol, inputRef, setInput);
  }

  const addSymbolToCustom = (symbol) => {
    addSymbols(symbol, settingRef, setCustom);
  }

  const addSymbols = (symbol, ref, setFunction) => {
    const input = ref.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const value = input.value;
    const newValue = value.substring(0, start) + symbol + value.substring(end);

    setFunction(newValue);
    setFocus(ref);
  }

  const setFocus = (ref) => {
    ref.current.focus();
  }


  return (
    <div className="App">
      <div className="UpperDiv">
        <h1 className="title is-1">Lambda Zoo Tour Guide</h1>
        <div>
          <div>
            <button className="button is-normal is-light" onClick={() => addSymbolToInput("λ")}>λ</button>
          </div>
          <Input reference={inputRef} value={input} onChange={updateInput} placeHolderText="Enter lambda term" />
        </div>
        <div className="OptionsDiv">
          <div className="ButtonDiv" style={{visibility: setting === "Custom" ? 'visible' : 'hidden'}}>
            <button className="button is-normal is-light" title="Left" onClick={() => addSymbolToCustom("↙")}>↙</button>
            <button className="button is-normal is-light" title="Right" onClick={() => addSymbolToCustom("↘")}>↘</button>
            <button className="button is-normal is-light" title="Down" onClick={() => addSymbolToCustom("↓")}>↓</button>
            <button className="button is-normal is-light" title="Beta" onClick={() => addSymbolToCustom("β")}>β</button>
            {/*<button className="button is-normal is-light" title="Union" onClick={() => addSymbolToCustom("∪")}>∪</button>*/}
            <button className="button is-normal is-light" title="Repeat" onClick={() => addSymbolToCustom("𝄇")}>𝄇</button>

          </div>
          <Setting strats={strategies} label="Reduce using:" setting={setting} reference={settingRef} value={custom} onSettingChange={updateSetting} onCustomChange={updateCustom} />
          <div className="OptionElements">
            <AppContainer input={input} custom={custom} setting={setting} onClick={updateResult}/>
          </div>
        </div>
      </div>
      <div className="LowerDiv">
        <div className="SequenceDiv">
          <ReductionSequence path={path} />
        </div>
        <div className="StatsDiv">
          <Stats nrSteps={nrSteps} result={result}/>
        </div>
      </div>
    </div>
  );
}

export default App;
