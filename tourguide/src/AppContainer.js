import React from "react";
import { Fragment } from "react";
import "./App.css";
import 'bulma/css/bulma.css';
import { buildTermFromString, substituteInTree } from "./Infrastructure/DataStructurHelper.js"
import { TreeNode } from "./Infrastructure/DataStructur";
import { Converter } from "./Infrastructure/Converter";
import { CustomRules } from "./Infrastructure/CustomRules";

export const inputHandler = new Converter();
export const customRules = new CustomRules();

export const TreeNodeComponent = ({ treeString }) => {
    return (
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {treeString}
      </pre>
    );
  };
    //return (
    //  <div>
    //    <TreeNodeComponent treeString={TreeNode.ToString(this.callByName(term, false))} />
    //  </div>
    //);

export class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.path = [];
        this.handleClick = this.handleClick.bind(this);
    }

    callByName(term, isRecursive) {
        if(term.Value === "ABS" && term.RightChild.Value === "APP") {
            term.RightChild = this.callByName(term.RightChild, true);
            this.path.push(inputHandler.BuildStringFromTree(term));
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
                this.path.push(inputHandler.BuildStringFromTree(term));
            }
        }
        return term;
    }

    ExecuteCustomRule(term, rules) {
        for (let rule of rules) {
            term = this.CustomRulesHelper(term, rule);
        };
        return term;
    }

    CustomRulesHelper(term, element) {
        switch (element) {
            case "↙":
                return customRules.LeftArrowFunction(term);

            case "↘":
                return customRules.RightArrowFunction(term);

            case "↓":
                return customRules.DownArrowFunction(term);

            case "β":
                return customRules.BetaFunction(term);

            case "∪":
                return customRules.UnionFunction(term);

            case "𝄇":
                return customRules.RepeatFunction(term);

            default:
                console.log("something went wrong in customRulesHelper");
                return "something went wrong";
        }
    }

    calculate(setting) {
        this.path = [];
        var term = buildTermFromString(this.props.input);
        this.path.push(inputHandler.BuildStringFromTree(term));
        switch(setting) {
            case "CBN":
                var term = inputHandler.BuildStringFromTree(this.callByName(term, false));
               return term;

            case "Custom":
                const rules = this.props.custom;
                var term = inputHandler.BuildStringFromTree(this.ExecuteCustomRule(term, rules));
                return term;

            default:
                return "Setting undefined";
        }
    }

    handleClick(e) {
            const setting = this.props.setting;
            const result = this.calculate(setting);
            //this.path.forEach(element => console.log("Step: \n" + element));
            const number = this.path.length;
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