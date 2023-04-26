import React from "react";
import "./App.css";

export class Input extends React.Component {
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
        <div className="control">
          <input placeholder={`Enter lambda term`} className="input" defaultValue={this.props.value} onChange={this.handleChange}/>
        </div>
        );
    }
}