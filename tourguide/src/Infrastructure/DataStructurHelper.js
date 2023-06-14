import { Converter } from "./Converter";
export function buildTermFromString(termString) {
        let inputHandler = new Converter();    
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