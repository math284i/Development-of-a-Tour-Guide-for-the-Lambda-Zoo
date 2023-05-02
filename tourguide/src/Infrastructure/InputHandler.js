
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

    findPairs(input) {
        const len = input.split('(').length;
        const stringArray = new Array(len).fill("");
      
        let currentNestedLevel = -1;
        for (let i = 0; i < input.length; i++) {
          const element = input.charAt(i);
          switch (element) {
            case '(':
              currentNestedLevel++;
              break;
            case ')':
              if (currentNestedLevel !== 0) {
                currentNestedLevel--;
              }
              break;
            default:
              stringArray[currentNestedLevel] += element;
              break;
          }
        }
        return stringArray;
      }
}

const t1 = "(λx.(yx)(zp))"
const inputHandler = new InputHandler();
const lambdaTerm = inputHandler.findPairs(t1);
console.log(`LambdaTerm: ${lambdaTerm}`);