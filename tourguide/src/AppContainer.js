import React from "react";
import "./App.css";
import 'bulma/css/bulma.css';
import { buildTermFromString } from "./Infrastructure/DataStructurHelper.js"
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
        this.validPhases = ["↙𝄇","↘𝄇","↓𝄇","β","∪"]
        this.handleClick = this.handleClick.bind(this);
    }

    /* //This is the initial hardcoded version of the CBN reduction strategy that we made. It functions similarly to the one build using phased strategies
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
    */

    ExecuteCustomRule(term, phasedStrategy, loop) {
        repeatloop: do {
            var result;
            var flag = 0;
            for(let phase of phasedStrategy) {
                result = this.CustomRulesHelper(term, phase, phasedStrategy);
                if(result === "Error") {
                    break repeatloop;
                }else if(!result) {
                    flag++;
                }else {
                    term = result;
                    if(loop) {
                        this.path.push(converter.BuildStringFromTree(term));
                    }
                }
            }
            if(flag === phasedStrategy.length) {
                if(loop) {
                    loop = false;
                }else {
                    return false;
                }
            }else {
            }
        } while(loop);
        return term;
    }

    CustomRulesHelper(term, element, phasedStrategy) {
        var recurse;
        switch (element) {
            case "↙𝄇":
                if(term.Value === "APP") {
                    recurse = this.ExecuteCustomRule(term.LeftChild, phasedStrategy, false);
                    if(recurse !== false) {
                        term.LeftChild = recurse;
                        return term;
                    }
                }
                return false;

            case "↘𝄇":
                if(term.Value === "APP") {
                    recurse = this.ExecuteCustomRule(term.RightChild, phasedStrategy, false);
                    if(recurse !== false) {
                        term.RightChild = recurse;
                        return term;
                    }
                }
                return false;

            case "↓𝄇":
                if(term.Value === "ABS") {
                    recurse = this.ExecuteCustomRule(term.RightChild, phasedStrategy, false);
                    if(recurse !== false) {
                        term.RightChild = recurse;
                        return term;
                    }
                }
                return false;

            case "β":
                return customRules.BetaFunction(term);

            case "∪":
                return customRules.UnionFunction(term);

            default:
                console.log("something went wrong in customRulesHelper");
                return "Error"
        }
    }

    calculate(setting) {
        this.path = [];
        var result;
        var term = buildTermFromString(this.props.input);
        this.path.push(converter.BuildStringFromTree(term));
        switch(setting) {
            case "CBN":
                return converter.BuildStringFromTree(this.ExecuteCustomRule(term, ["↙𝄇","β"], true));
            
            case "LCBW":
                return converter.BuildStringFromTree(this.ExecuteCustomRule(term, ["↙𝄇","↘𝄇","β"], true));

            case "RCBW":
                return converter.BuildStringFromTree(this.ExecuteCustomRule(term, ["↘𝄇","↙𝄇","β"], true));

            case "LOW":
                return converter.BuildStringFromTree(this.ExecuteCustomRule(term, ["β","↙𝄇","↘𝄇"], true));

            case "Custom":
                if(this.props.custom.length === 0) {
                    result = converter.BuildStringFromTree(term);
                }else {
                    var phasedStrategy = this.props.custom.split(";");
                    for(let phase of phasedStrategy) {
                        if(!this.validPhases.includes(phase)) {
                            alert("Please enter a valid phased strategy. Valid phases are: " + this.validPhases.toString());
                            return converter.BuildStringFromTree(term);;
                        }
                    }
                    result = converter.BuildStringFromTree(this.ExecuteCustomRule(term, phasedStrategy, true));
                }
                return result;

            default:
                return "Setting undefined";
        }
    }

    handleClick(e) {
            const setting = this.props.setting;
            const result = this.calculate(setting);
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