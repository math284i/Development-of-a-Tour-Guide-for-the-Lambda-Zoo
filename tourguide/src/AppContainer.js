import React from "react";
import { Fragment } from "react";
import "./App.css";
import 'bulma/css/bulma.css';
import { buildTermFromString, substituteInTree } from "./Infrastructure/InputHandler.js"
import { TreeNode } from "./Infrastructure/ImprovedDataStructur";

const TreeNodeComponent = ({ treeString }) => {
    return (
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {treeString}
      </pre>
    );
  };
  
  export default TreeNodeComponent;

export class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.path = [];
        this.handleClick = this.handleClick.bind(this);
    }

    callByName(term) {
        while(term.value === "APP") {
            if(term.leftChild.value === "ABS") {
                var func = term.leftChild.rightChild;
                var parameter = term.leftChild.leftChild;
                var subs = term.rightChild;

                term = substituteInTree(func, parameter, subs);
            } else if(term.leftChild.value === "APP") {
                term.leftChild = this.callByName(term.leftChild);
            } else if(term.rightChild.value === "APP") {
                term.rightChild = this.callByName(term.rightChild);
            } else {
                break;
            }
            this.path.push(term);
        }
        return term;
    }

    calculate(setting) {
        this.path.push(this.props.input)
        var term = buildTermFromString(this.props.input);
         
        switch(setting) {
            case "CBN":
                return (
                    <div>
                        <TreeNodeComponent treeString={this.callByName(term)} />
                    </div>
                 );
                return this.callByName(term);
            default:
                return "Setting undefined";
        }
    }

    handleClick(e) {
            const setting = this.props.setting;
            const result = this.calculate(setting);
            const number = 2;
            const determinism = "False";
            this.props.onClick(result, number, determinism);
        }

    render() {
        return (
            <div>
                <button className="button is-primary" onClick={this.handleClick}>Generate</button>
            </div>
        );
    }
}