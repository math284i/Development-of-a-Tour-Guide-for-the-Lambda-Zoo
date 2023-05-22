import React from "react";
import { Fragment } from "react";
import "./App.css";
import 'bulma/css/bulma.css';
import { buildTermFromString, substituteInTree } from "./Infrastructure/InputHandler.js"
import { TreeNode } from "./Infrastructure/ImprovedDataStructur";

export const TreeNodeComponent = ({ treeString }) => {
    return (
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {treeString}
      </pre>
    );
  };

export class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.path = [];
        this.handleClick = this.handleClick.bind(this);
    }

    callByName(term, isRecursive) {
        if(term.Value === "ABS" && term.RightChild.Value === "APP") {
            term.RightChild = this.callByName(term.RightChild, true);
            this.path.push(TreeNode.ToString(term));
        }
        while(term.Value === "APP") {
            if(term.LeftChild.Value === "ABS") {
                var func = term.LeftChild.RightChild;
                var parameter = term.LeftChild.LeftChild;
                var subs = term.RightChild;
                term = substituteInTree(func, parameter, subs);
            } else if(term.LeftChild.Value === "APP") {
                term.LeftChild = this.callByName(term.LeftChild, true);
            } else if(term.RightChild.Value === "APP") {
                term.RightChild = this.callByName(term.RightChild, true);
            } else {
                break;
            }
            if(!isRecursive) {
                //console.log(TreeNode.ToString(term));
                this.path.push(TreeNode.ToString(term));
            }
        }
        return term;
    }

    calculate(setting) {
        this.path = [];
        var term = buildTermFromString(this.props.input);
        this.path.push(TreeNode.ToString(term));
        switch(setting) {
            case "CBN":
                
                return (
                    <div>
                        <TreeNodeComponent treeString={TreeNode.ToString(this.callByName(term, false))} />
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
            //this.path.forEach(element => console.log("Step: \n" + element));
            const number = 2;
            this.props.onClick(result, number, this.path);
        }

    render() {
        return (
            <div>
                <button className="button is-primary" onClick={this.handleClick}>Generate</button>
            </div>
        );
    }
}