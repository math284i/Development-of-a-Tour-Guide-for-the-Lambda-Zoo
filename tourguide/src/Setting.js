import React from "react";
import "./App.css";

export class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.props.onChange(value);
    }

    render() {
        return (
        <div className="SecondUpperChild">
            <label className="label">{this.props.label}</label>
            <div className="select is-fullwidth">
                <select onChange={this.handleChange}>
                    <option>LCBW</option>
                    <option>RCBW</option>
                </select>
            </div>
        </div>
        );
    }
}