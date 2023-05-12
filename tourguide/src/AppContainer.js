import React from "react";
import "./App.css";
import 'bulma/css/bulma.css';
import { LambdaCalculus } from "./Infrastructure/Datastructur.js"
import { InputHandler } from "./Infrastructure/InputHandler.js"
import { TreeNode } from "./Infrastructure/ImprovedDataStructur";


export class AppContainer extends React.Component {
    constructor(props) {
        this.path = [];
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    callByName(term) {
        //One beta step with cbn:
        //If my left child is an abstraction (Has lambda)
        //Then take the left childs left child and save
        //Take the right child of my left child and substitute with my right child
        //I become the result of the previous substitution
        //Save me (toString) as a step in the path array
        //Recursively call this function until no more terms are present or no more steps can be done
        return term;
    }

    calculate(setting) {
        this.path.push(this.props.input)
        switch(setting) {
            case "CBN":
                return this.callByName(this.props.input);
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