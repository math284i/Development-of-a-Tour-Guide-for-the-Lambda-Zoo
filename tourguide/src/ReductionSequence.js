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
                {(index === 0) ? <h3 className="title is-4">Initial term</h3> : <h3 className="title is-4">Step {index}</h3>}
                <h4 className="title is-5"> {step} </h4>
              </div>
            ))}
          </div>
        );
    }
}