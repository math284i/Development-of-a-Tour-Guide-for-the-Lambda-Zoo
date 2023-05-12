export class TreeNode {
    constructor(value) {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }

    static findNode(root, value) {
        if (!root) {
            return null;
        }

        if (root.value === value) {
            return root;
        }

        let node = TreeNode.findNode(root.leftChild, value);
        if (node) {
            return node;
        }

        let node2 = TreeNode.findNode(root.rightChild, value);
        return node2 ?? null;
    }

    static toString(root, depth = 0) {
        if (!root) {
            return "";
        }

        let result = " ".repeat(depth * 2) + root.value + "\n";
        result += TreeNode.toString(root.leftChild, depth + 1);
        result += TreeNode.toString(root.rightChild, depth + 1);
        return result;
    }
}

let root = new TreeNode("ABS");
let leftChild = new TreeNode("App");
let leftleft = new TreeNode("\\x");
let leftRight = new TreeNode("App");
let leftRightLeft = new TreeNode("\\y");
let leftRightRight = new TreeNode("y");

leftRight.leftChild = leftRightLeft;
leftRight.rightChild = leftRightRight;

leftChild.leftChild = leftleft;
leftChild.rightChild = leftRight;

let rightChild = new TreeNode("App");
let rightLeft = new TreeNode("\\z");
let rightRight = new TreeNode("z");
rightChild.leftChild = rightLeft;
rightChild.rightChild = rightRight;

root.leftChild = leftChild;
root.rightChild = rightChild;

console.log("ImprovedDataStructur");
console.log(TreeNode.toString(root));