import React from "react";
import "./App.css";

export class ReductionSequence extends React.Component {
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
        <div>
          <h2 className="title is-2">Reduction Sequence</h2>
        </div>
        );
    }
}