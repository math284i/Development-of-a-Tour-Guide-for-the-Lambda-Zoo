import React from "react";
import "./App.css";
import 'bulma/css/bulma.css';
import { LambdaCalculus } from "./Infrastructure/Datastructur.js"
import { InputHandler } from "./Infrastructure/InputHandler.js"



export class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
            const result = "Hej Kp!";
            this.props.onClick(result);
        }

    render() {
        return (
            <div className="divElement">
                <button className="button is-primary" onClick={this.handleClick}>Generate</button>
            </div>
        );
    }
}