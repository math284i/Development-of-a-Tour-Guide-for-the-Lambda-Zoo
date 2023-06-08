import React, {useState} from "react";
import "./App.css";


export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.placeHolderText = props.placeHolderText;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.props.onChange(value);
    }

    render() {
        return (
        <div className="control">
            <input ref={this.props.reference} placeholder={this.placeHolderText} className="input" id="large-input" value={this.props.value} onChange={this.handleChange}/>
        </div>
        );
    }
}