import { substituteInTree } from "./DataStructurHelper.js"


export class CustomRules {

    LeftArrowFunction(term) {
        if(term.Value === "APP") {
            return term.LeftChild;
        }
        return false;
    }

    RightArrowFunction(term) {
        if(term.Value === "APP") {
            return term.RightChild;
        }
        return false;
    }

    DownArrowFunction(term) {
        if(term.Value === "ABS") {
            return term.RightChild;
        }
        return false;
    }

    BetaFunction(term) {
        if(term.Value === "ABS" && term.Parent.Value === "APP" && term === term.Parent.LeftChild) {
            var func = term.RightChild;
            var parameter = term.LeftChild;
            var subs = term.Parent.RightChild;
            return substituteInTree(func, parameter, subs);
        }
        return false;
    }

    UnionFunction(term) {
        console.log("union");
        return term;
    }

    RepeatFunction(phasedStrategy, term) {
        //Do some kind of recursive call, to determine if done
        //, check if previous return is equal to what we return now. Since we got the same, we must be done.
        console.log("repeating");
        return term;
    }
}