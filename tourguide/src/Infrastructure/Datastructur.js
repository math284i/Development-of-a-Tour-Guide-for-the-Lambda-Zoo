export class LambdaCalculus {
    constructor(expressions) {
        this.expressions = expressions;
    }

    toString() {
        console.log("toString: size = " + this.expressions.length);
        let outputString = "";
        for (let i = 0; i < this.expressions.length; i++) {
            outputString += `${this.expressions[i].toString()}`;
        }
        return outputString;
    }
}


export class LambdaExpr {
    constructor(type, param, symbol, application) {
      this.type = type;
      this.param = param;
      this.symbol = symbol;
      this.application = application;
    }

    toString() {
        return `(${this.symbol}${this.param}.${this.application.toString()})`
    }
}

export class Application {
    constructor(type, left, right) {
        this.type = type;
        this.left = left;
        this.right = right;
    }

    toString() {
        return `(${this.left.toString()}${this.right.toString()})`;
    }
}

export class Variable {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }

    toString() {
        return this.name;
    }

}

// Example λx.(y.x)
const lambdaCalculus = new LambdaCalculus(
    [
    new LambdaExpr(
        "abstraction",
        "x",
        "λ",
        new Application(
            "application",
            new Variable(
                "variableLeft",
                "y"
            ),
            new Variable(
                "variableRight",
                "x"
            ),
        ),
    ),
    ]
);

const t2 = new LambdaCalculus(
    [
        new LambdaExpr(
            "abstraction",
            "x",
            "λ",
            new Variable(
                "variable",
                "x"
            ),
        ),
        new LambdaExpr(
            "abstraction",
            "y",
            "λ",
            new Variable(
                "variable",
                "y"
            ),
        ),
        new Variable(
            "variable",
            "z",
        ),
    ]
);

const t3 = new LambdaCalculus(
    [
        new LambdaExpr(
            "abstraction",
            "x",
            "λ",
            new Application(
                "application",
                new Variable(
                    "variableLeft",
                    "x"
                ),
                new Variable(
                    "variableRight",
                    "x"
                )
            )
        ),
        new Application(
            "application",
            new LambdaExpr(
                "abstraction",
                "x",
                "λ",
                new Variable(
                    "variable",
                    "x"
                )
            ),
            new LambdaExpr(
                "abstractino",
                "x",
                "λ",
                new Variable(
                    "variable",
                    "x"
                )
            ),
        )
    ]
);

console.log("From Datastructur: " + lambdaCalculus.toString());
console.log("From Datastructur: " + t2.toString());
console.log("From Datastructur: " + t3.toString());
console.log("--------------------");