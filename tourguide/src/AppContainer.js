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
        while(term.Value === "APP") {
            if(term.LeftChild.Value === "ABS") {
                var func = term.LeftChild.RightChild;
                var parameter = term.LeftChild.LeftChild;
                var subs = term.RightChild;
                term = substituteInTree(func, parameter, subs);
                console.log(TreeNode.ToString(term));
            } else if(term.LeftChild.Value === "APP") {
                term.LeftChild = this.callByName(term.LeftChild);
            } else if(term.RightChild.Value === "APP") {
                term.RightChild = this.callByName(term.RightChild);
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
                        <TreeNodeComponent treeString={TreeNode.ToString(this.callByName(term))} />
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