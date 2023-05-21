import { TreeNode } from "./ImprovedDataStructur";
import { InputHandler } from "./InputHanlderImproved";
export function buildTermFromString(termString) {
        let inputHanlder = new InputHandler();    
        let root = inputHanlder.BuildTreeFromString(termString, null);
        return TreeNode.ToString(root);
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


let root = new TreeNode("APP", null);
let left = new TreeNode("ABS", null);
let leftLeft = new TreeNode("x", null);
let leftRight = new TreeNode("ABS", null);
let leftRightLeft = new TreeNode("y", null);
let leftRightRight = new TreeNode("APP", null);
let leftRightRightLeft = new TreeNode("x", null);
let leftRightRightRight = new TreeNode("z", null);
      
leftRightRight.leftChild = leftRightRightLeft;
leftRightRight.rightChild = leftRightRightRight;
      
leftRight.leftChild = leftRightLeft;
leftRight.rightChild = leftRightRight;
      
left.leftChild = leftLeft;
left.rightChild = leftRight;
      
let right = new TreeNode("ABS", null);
let rightLeft = new TreeNode("z", null);
let rightRight = new TreeNode("z", null);
right.leftChild = rightLeft;
right.rightChild = rightRight;
      
root.leftChild = left;
root.rightChild = right;

const test = substituteInTree(leftRight, leftLeft, right);
console.log('Testing: \n' + TreeNode.ToString(test));