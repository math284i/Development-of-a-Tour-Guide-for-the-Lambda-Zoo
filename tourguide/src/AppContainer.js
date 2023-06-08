import React from "react";
import { Fragment } from "react";
import "./App.css";
import 'bulma/css/bulma.css';
import { buildTermFromString, substituteInTree } from "./Infrastructure/DataStructurHelper.js"
import { TreeNode } from "./Infrastructure/DataStructur";
import { Converter } from "./Infrastructure/Converter";
import { CustomRules } from "./Infrastructure/CustomRules";

export const converter = new Converter();
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
            this.path.push(converter.BuildStringFromTree(term));
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
                this.path.push(converter.BuildStringFromTree(term));
            }
        }
        return term;
    }

    ExecuteCustomRule(term, phasedStrategy) {
        var temp = term;
        phaseloop: for(var i = 0; i < phasedStrategy.length; i++) {
            var flag = false;
            elementloop: for(let element in phasedStrategy) {
                var result = this.CustomRulesHelper(element, temp, phasedStrategy);
                if(result === false) {
                    flag = true;
                    break elementloop;
                }
                temp = result;
            }
        }
        //Try phase 0
        //If phase 0 works, do nothing
        //Else, if phase 0 does not work, try phase 1
        //If phase 1 does not work, try phase 2 and so forth, until array ends
        //If none of them work, term is already in normal form
        return term;
    }

    CustomRulesHelper(term, element, phasedStrategy) {
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
                return customRules.ExecuteCustomRule(term, phasedStrategy);

            default:
                console.log("something went wrong in customRulesHelper");
                return "something went wrong";
        }
    }

    calculate(setting) {
        this.path = [];
        var term = buildTermFromString(this.props.input);
        this.path.push(converter.BuildStringFromTree(term));
        switch(setting) {
            case "CBN":
                var result = converter.BuildStringFromTree(this.callByName(term, false));
               return result;

            case "Custom":
                var phasedStrategy = this.props.custom.split(";");
                var result = converter.BuildStringFromTree(this.ExecuteCustomRule(term, phasedStrategy));
                return result;

            default:
                return "Setting undefined";
        }
    }

    handleClick(e) {
            const setting = this.props.setting;
            const result = this.calculate(setting);
            //this.path.forEach(element => console.log("Step: \n" + element));
            const number = this.path.length - 1;
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