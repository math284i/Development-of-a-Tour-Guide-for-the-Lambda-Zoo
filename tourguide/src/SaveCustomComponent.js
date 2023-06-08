import React, {useState, useRef} from "react";
import "./App.css";


export default function SettingComponent(props) {

    const [dropdownItems, setDropdownItems] = useState([
        { label: "Saved", value: "" },
    ]);
    
    const [selectedValue, setSelectedValue] = useState(dropdownItems[0].value);

    const removeItem = (index) => {
        const updatedItems = [...dropdownItems];
        updatedItems.splice(index, 1);
        setDropdownItems(updatedItems);

        if (selectedValue === dropdownItems[index].value) {
            setSelectedValue(dropdownItems[0].value);
          }
    };

    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);

        const selectedOption = dropdownItems.find((item) => item.value === selectedValue);
        if (selectedOption) {
            props.addToCustom(selectedOption.value);
            console.log(`Selected option "${selectedOption.label}" with value "${selectedOption.value}"`);
        }
    };


    const handleSaveCustomRule = () => {
        let name = prompt("Give a name to ur strategy \n" + props.value)
        if (name !== null) {
          const newValue = {label: name, value: props.value};
          setDropdownItems(dropdownItems => [...dropdownItems, newValue]);
          setSelectedValue(newValue);
        }
    };

    return (
    <div>
      <div className="SaveCustom">
        <div className="SaveCustomLeft">
        <div className="select is-fullwidth">
            <select onChange={handleSelect} id="SavedDropDown" value={selectedValue}>
                {dropdownItems.map((item, index) => (
                  <option key={index} value={item.value} title={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              </div>
            </div>
            <div className="SaveCustomRight">
            <button className="button is-normal is-light" id="saveButton" title="Save" onClick={() => handleSaveCustomRule()}>Save</button>
            </div>
          </div>
        </div>
    );
}