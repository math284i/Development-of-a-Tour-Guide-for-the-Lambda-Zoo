

// Example λx.(y.x)
const t = {
    type: 'abstraction',
    param: 'x',
    body: {
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
    symbol: 'λ'
};

export class LambdaCalculus {
    constructor(expressions = []) {
        this.expressions = expressions;
    }

    toString() {
        const outputString = "";
        this.expressions.forEach(element => {
            outputString += " Hello world!";
        });
        return outputString;
    }
}


export class LambdaExpr {
    constructor(type, param, body, symbol) {
      this.type = type;
      this.param = param;
      this.body = body;
      this.symbol = symbol;
    }

    testFunction() {
        if (this.type === "abstraction") {
            return this.symbol + this.param + "." + this.body.testFunction();
        }
        if (this.type === "application") {
            return "sup";
        }
    }

    toString() {
        if (this.type === 'variable') {
          return this.param;
        } else if (this.type === 'abstraction') {
          const bodyString = this.body ? this.body.toString() : '';
          return `${this.symbol}${this.param}.${bodyString}`;
        } else if (this.type === 'application') {
          const leftString = this.left ? this.left.toString() : '';
          const rightString = this.right ? this.right.toString() : '';
          return `${leftString}${rightString}`;
        } else {
          throw new Error('Unknown expression type');
        }
      }
}

export class Application {
    constructor(type, left, right) {
        this.type = type;
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + "." + this.right.toString();
    }
}

export class Variable {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
}

const lambdaCalculus = new LambdaCalculus(
    new LambdaExpr(
        "abstraction",
        "x",
        new Application(
            "application",
            new Variable(
                "variable",
                "y"
            ),
            new Variable(
                "variable",
                "x"
            ),
        ),
        "λ"
    ),
);



// Anything below this line has to be rewritten. 
const lambdaExpr = new LambdaExpr(
    'abstraction',
    'x',
    {
      type: 'application',
      left: {
        type: 'variable',
        name: 'z'
      },
      right: {
        type: 'variable',
        name: 'y'
      }
    },
    'λ'
);

const a = new LambdaExpr(
    'abstraction',
    'x',
    new LambdaExpr(
      'application',
      new LambdaExpr('variable', 'x'),
      new LambdaExpr('variable', 'y')
    ),
    'λ'
  );

//console.log("a: " + "" + a.toString());
console.log("Testing: " + a.testFunction());

