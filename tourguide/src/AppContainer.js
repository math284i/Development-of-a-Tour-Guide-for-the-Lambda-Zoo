import React from "react";
import "./App.css";
import 'bulma/css/bulma.css';
import { LambdaExpr } from "./Infrastructure/Datastructur.js"



export class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const lambdaExpr = new LambdaExpr(
            'abstraction',
            'x',
            {
              type: 'application',
              left: {
                type: 'variable',
                name: 'x'
              },
              right: {
                type: 'variable',
                name: 'y'
              }
            },
            'λ'
        );
            var result = lambdaExpr.toString();
            console.log("Result: " + result);
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