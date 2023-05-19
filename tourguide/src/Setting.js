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

    render() {
        return (
        <div className="SecondUpperChild">
            <label className="label">{this.props.label}</label>
            <div className="select is-fullwidth">
                <select onChange={this.handleSettingChange}>
                    <option>CBN</option>
                    <option>Custom</option>
                </select>
            </div>
            <input className="input is-small" value={this.props.value} placeholder={`Enter custom reduction sequence`} onChange={this.handleCustomChange} style={{visibility: this.props.setting === "Custom" ? 'visible' : 'hidden'}} />
        </div>
        );
    }
}