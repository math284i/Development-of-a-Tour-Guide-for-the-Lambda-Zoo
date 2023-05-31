



export class CustomRules {

    LeftArrowFunction(term) {
        console.log("leftArrow");
        return term;
    }

    RightArrowFunction(term) {
        console.log("rightArrow");
        return term;
    }

    DownArrowFunction(term) {
        console.log("downArrow");
        return term;
    }

    BetaFunction(term) {
        console.log("betaFunction");
        return term;
    }

    UnionFunction(term) {
        console.log("union");
        return term;
    }

    RepeatFunction(term) {
        //Do some kind of recursive call, to determine if done
        //, check if previous return is equal to what we return now. Since we got the same, we must be done.
        console.log("repeating");
        return term;
    }
}