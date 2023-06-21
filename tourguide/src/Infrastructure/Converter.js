import { TreeNode } from "./DataStructur";

export class Converter {
    BuildTreeFromString(inputString, parent) {
        let root;
        let index = inputString.length > 1 ? 1 : 0;
        let sanitisedString = "";
        switch (inputString[index]) {
            case '(':
                root = new TreeNode("APP", parent);

                [sanitisedString, index] = this.SanitizeString(inputString, index, -1);
                root.LeftChild = this.BuildTreeFromString(sanitisedString, root);

                [sanitisedString, index] = this.SanitizeString(inputString, index, -1);
                root.RightChild = this.BuildTreeFromString(sanitisedString, root);
                break;

            case 'λ': //ABS
                root = new TreeNode("ABS", parent);
                for (let i = index + 1; i < inputString.length; i++) {
                    if (inputString[i] === '.') {
                        index = i + 1;
                        break;
                    }
                    sanitisedString += inputString[i];
                }

                root.LeftChild = this.BuildTreeFromString(sanitisedString, root);

                [sanitisedString, index] = this.SanitizeString(inputString, index, -1);

                root.RightChild = this.BuildTreeFromString(sanitisedString, root);
                break;

            default: //VAR
                inputString = inputString.replace(/\(/g, "");
                inputString = inputString.replace(/\)/g, "");
                root = new TreeNode(inputString, parent);
                break;
        }
        return root;
    }

    SanitizeString(inputString, index, nestedLevel) {
        let done = false;
        let output = "";
        while (!done && index < inputString.length - 1) {

            switch (inputString[index]) {
                case '(':
                    nestedLevel++;
                    output += inputString[index];
                    break;
                case ')':
                    nestedLevel--;
                    output += inputString[index];
                    if (nestedLevel < 0) {
                        done = true;
                    }
                    break;
                default:
                    output += inputString[index];
                    break;
            }
            index++;
        }
        return [output, index];
    }

    BuildStringFromTree(root) {
        let outputString = "";
        outputString += (() => {
            switch (root.Value) {
                case "APP":
                    return `(${this.BuildStringFromTree(root.LeftChild)}${this.BuildStringFromTree(root.RightChild)})`;
                case "ABS":
                    return `(λ${this.BuildStringFromTree(root.LeftChild)}.${this.BuildStringFromTree(root.RightChild)})`;
                default:
                    return root.Value;
            }
        })();
        return outputString;
    }
}