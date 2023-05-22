import { TreeNode } from "./ImprovedDataStructur";
import { InputHandler } from "./InputHandlerImproved";
export function buildTermFromString(termString) {
        let inputHandler = new InputHandler();    
        let root = inputHandler.BuildTreeFromString(termString, null);
        return root;
    }

export function substituteInTree(node, parameter, substituteWith) {
  if(node.Value === parameter.Value) { //Basecase - If the tree is just a variable equal to parameter
    node = substituteWith;
  }else if(node.Value === "APP") {
    node.LeftChild = substituteInTree(node.LeftChild, parameter, substituteWith);
    node.RightChild = substituteInTree(node.RightChild, parameter, substituteWith);
  }else if(node.Value === "ABS" && node.LeftChild.Value !== parameter) {
    node.RightChild = substituteInTree(node.RightChild, parameter, substituteWith);
  }
  return node;
}

/*
let root = new TreeNode("APP", null);
let left = new TreeNode("ABS", null);
let leftLeft = new TreeNode("x", null);
let leftRight = new TreeNode("ABS", null);
let leftRightLeft = new TreeNode("y", null);
let leftRightRight = new TreeNode("APP", null);
let leftRightRightLeft = new TreeNode("x", null);
let leftRightRightRight = new TreeNode("z", null);
      
leftRightRight.LeftChild = leftRightRightLeft;
leftRightRight.RightChild = leftRightRightRight;
      
leftRight.LeftChild = leftRightLeft;
leftRight.RightChild = leftRightRight;
      
left.LeftChild = leftLeft;
left.RightChild = leftRight;
      
let right = new TreeNode("ABS", null);
let rightLeft = new TreeNode("z", null);
let rightRight = new TreeNode("z", null);
right.LeftChild = rightLeft;
right.RightChild = rightRight;
      
root.LeftChild = left;
root.RightChild = right;

const test = substituteInTree(leftRight, leftLeft, right);
console.log('Testing: \n' + TreeNode.ToString(test));
*/