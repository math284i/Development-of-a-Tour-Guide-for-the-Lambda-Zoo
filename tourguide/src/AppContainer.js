import React from "react";
import "./App.css";
import 'bulma/css/bulma.css';
import { LambdaCalculus } from "./Infrastructure/Datastructur.js"
import { InputHandler } from "./Infrastructure/InputHandler.js"
import { TreeNode } from "./Infrastructure/ImprovedDataStructur";


export class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    callByName(term) {
        return term;
    }

    calculate(setting) {
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