
class InputHandler {
    buildTermFromString(termString) {
        var regExp = /\(([^)]+)\)/g;
        var matches = termString.match(regExp);
        for (var i = 0; i < matches.length; i++) {
            var str = matches[i];
            console.log(str.substring(1, str.length - 1));
        }
        return termString;
    }
}

const t1 = "(λx.(yx))"
const inputHandler = new InputHandler();
const lambdaTerm = inputHandler.buildTermFromString(t1);
console.log(`LambdaTerm: ${lambdaTerm}`);