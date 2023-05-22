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
          {this.props.path.map(function(object, i){
            return <TreeNodeComponent treeString={object} key={i} />
          })}
        </div>
        );
    }
}