import React, {useState} from "react";
import "./App.css";
import SettingComponent from "./SaveCustomComponent";


export class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.handleSettingChange = this.handleSettingChange.bind(this);
        this.handleCustomChange = this.handleCustomChange.bind(this);
        this.replaceCustom = this.replaceCustom.bind(this);
    }

    handleSettingChange(e) {
        const value = e.target.value;
        this.props.onSettingChange(value);
    }

    handleCustomChange(e) {
        const value = e.target.value;
        this.props.onCustomChange(value);
    }

    replaceCustom(e) {
        this.props.onCustomChange(e);
    }

    render() {
        return (
        <div className="OptionElements">
            <label className="label">{this.props.label}</label>
            <div className="select is-fullwidth">
                <select onChange={this.handleSettingChange}>
                    <option>CBN</option>
                    <option>Custom</option>
                </select>
            </div>
            <div style={{visibility: this.props.setting === "Custom" ? 'visible' : 'hidden'}}>
            <input className="input is-small" ref={this.props.reference} value={this.props.value} placeholder={`Enter custom reduction sequence`} onChange={this.handleCustomChange} />
            <SettingComponent addToCustom={this.replaceCustom} value={this.props.value}/>
            </div>
        </div>
        );
    }
}