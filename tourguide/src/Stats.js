import React from "react";
import "./App.css";

export class Stats extends React.Component {

    render() {
        return (
        <div>
            <h2 className="title is-2">Stats</h2>
            <h2 className="title is-3">Number of steps: {this.props.nrSteps}</h2>
            <h2 className="title is-3">Determinism: {this.props.determinism}</h2>
            <h2 className="title is-3">Result: {this.props.result}</h2>
        </div>
        );
    }
}