import React from "react";
import "./App.css";

export class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.handleSettingChange = this.handleSettingChange.bind(this);
        this.handleCustomChange = this.handleCustomChange.bind(this);
    }

    handleSettingChange(e) {
        const value = e.target.value;
        this.props.onSettingChange(value);
    }

    handleCustomChange(e) {
        const value = e.target.value;
        this.props.onCustomChange(value);
    }

    handleSavedChange(e) {

    }

    tempHandler = () => {
        console.log("Saving: " + this.props.value);
    }

    render() {
        return (
        <div className="OptionElements">
            <label className="label">{this.props.label}</label>
            <div className="select is-fullwidth">
                <select onChange={this.handleSettingChange}>
                    {this.props.strats.map((strategy, index) => (
                        <option key={index+1}>{strategy}</option>
                    ))}
                </select>
            </div>
            <div style={{visibility: this.props.setting === "Custom" ? 'visible' : 'hidden'}}>
                <input className="input is-small" ref={this.props.reference} value={this.props.value} placeholder={`Enter custom reduction sequence`} onChange={this.handleCustomChange}/>
                <div className="SaveCustom">
                    <div className="SaveCustomLeft">
                        <div className="select is-fullwidth">
                            <select onChange={this.handleSavedChange}>
                                <option>Saved</option>
                                <option>Custom</option>
                            </select>
                        </div>
                    </div>
                    <div className="SaveCustomRight">
                        <button className="button is-normal is-light" title="Save" onClick={() => this.tempHandler()}>Save</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}