import React from "react";
import "./App.css";
import { TreeNodeComponent } from "./AppContainer"

export class ReductionSequence extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <h2 className="title is-2">Reduction Sequence</h2>
            {this.props.path.map((step, index) => (
              <div key={index}>
                <h3>Step {index + 1}</h3>
                {step}
              </div>
            ))}
          </div>
        );
    }
}