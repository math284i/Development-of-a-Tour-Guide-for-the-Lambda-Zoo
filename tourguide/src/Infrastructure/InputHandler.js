import { TreeNode } from "./ImprovedDataStructur";
export function buildTermFromString(termString) {
        return "Hej KP";
    }

export function substituteInTree(node, parameter, substituteWith) {
  if(node.value === parameter.value) { //Basecase - If the tree is just a variable equal to parameter
    node.value = substituteWith;
  }else if(node.value === "APP") {
    node.leftChild = substituteInTree(node.leftChild, parameter, substituteWith);
    node.rightChild = substituteInTree(node.rightChild, parameter, substituteWith);
  }else if(node.value === "ABS" && node.leftChild.value !== parameter) {
    node.rightChild = substituteInTree(node.rightChild, parameter, substituteWith);
  }
  return node;
}

export function findPairs(input) {
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


let root = new TreeNode("APP");
let left = new TreeNode("ABS");
let leftLeft = new TreeNode("x");
let leftRight = new TreeNode("ABS");
let leftRightLeft = new TreeNode("y");
let leftRightRight = new TreeNode("APP");
let leftRightRightLeft = new TreeNode("x");
let leftRightRightRight = new TreeNode("z");
      
leftRightRight.leftChild = leftRightRightLeft;
leftRightRight.rightChild = leftRightRightRight;
      
leftRight.leftChild = leftRightLeft;
leftRight.rightChild = leftRightRight;
      
left.leftChild = leftLeft;
left.rightChild = leftRight;
      
let right = new TreeNode("ABS");
let rightLeft = new TreeNode("z");
let rightRight = new TreeNode("z");
right.leftChild = rightLeft;
right.rightChild = rightRight;
      
root.leftChild = left;
root.rightChild = right;

const t1 = "(λx.(yx)(zp))"
const lambdaTerm = findPairs(t1);
console.log(`LambdaTerm: ${lambdaTerm}`);
const test = substituteInTree(leftRight, leftLeft, right);
console.log('Testing: \n' + TreeNode.toString(test));