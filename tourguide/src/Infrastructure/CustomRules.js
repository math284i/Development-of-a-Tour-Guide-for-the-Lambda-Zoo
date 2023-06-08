import { substituteInTree } from "./DataStructurHelper.js"


export class CustomRules {

    BetaFunction(term) {
        if(term.Value === "APP" && term.LeftChild.Value === "ABS") {
            var func = term.LeftChild.RightChild;
            var parameter = term.LeftChild.LeftChild;
            var subs = term.RightChild;
            return substituteInTree(func, parameter, subs);
        }
        return false;
    }

    UnionFunction(term) {
        console.log("union");
        return term;
    }
}