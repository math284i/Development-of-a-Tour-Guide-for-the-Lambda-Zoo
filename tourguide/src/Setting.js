import React from "react";
import "./App.css";
import SettingComponent from "./SaveCustomComponent";


export class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.handleSettingChange = this.handleSettingChange.bind(this);
        this.handleCustomChange = this.handleCustomChange.bind(this);
        this.replaceCustom = this.replaceCustom.bind(this);
        this.howTo = "To use this tool, first write a lambda term in the field asking you to do so. It is important to explicitly write paranthesis in the term, for example ((λx.x)(λy.y)). Additionally, an application with two variable terms needs explicit paranthesis as such: ((x)(y)) \n When a valid term has been entered, you need to select a reduction strategy in the dropdown menu. Choosing the \"Custom\" strategy, allows you to write a phased strategy yourself. It is important that you put semicolons between each phase of the strategy, for it to work properly.\n Finally, press the generate button to generate a reduction of your term using your selected strategy.";
    }

    handleSettingChange(e) {
        const value = e.target.value;
        this.props.onSettingChange(value);
    }

    handleCustomChange(e) {
        const value = e.target.value;
        this.props.onCustomChange(value);
    }

    replaceCustom(e) {
        this.props.onCustomChange(e);
    }

    render() {
        return (
        <div className="OptionElements">
            <div className="label-container">
                
                <span className="icon" value={this.howTo}>
                    <i className="fas fa-exclamation-circle"></i>
                </span>
                <label className="label" id="reduce-label">{this.props.label}</label>
            </div>
            <div className="select is-fullwidth">
                <select onChange={this.handleSettingChange}>
                    {this.props.strats.map((strategy, index) => (
                        <option key={index+1}>{strategy}</option>
                    ))}
                </select>
            </div>
            <div style={{visibility: this.props.setting === "Custom" ? 'visible' : 'hidden'}}>
            <input className="input is-small" ref={this.props.reference} value={this.props.value} placeholder={`Enter custom reduction sequence`} onChange={this.handleCustomChange} />
            <SettingComponent addToCustom={this.replaceCustom} value={this.props.value}/>
            </div>
        </div>
        );
    }
}