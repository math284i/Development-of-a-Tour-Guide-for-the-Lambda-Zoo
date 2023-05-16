
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

let root = new TreeNode("APP");
let left = new TreeNode("ABS");
let leftleft = new TreeNode("x");
let leftRight = new TreeNode("ABS");
let leftRightLeft = new TreeNode("y");
let leftRightRight = new TreeNode("APP");
let leftRightRightLeft = new TreeNode("x");
let leftRightRightRight = new TreeNode("z");

leftRightRight.leftChild = leftRightRightLeft;
leftRightRight.rightChild = leftRightRightRight;

leftRight.leftChild = leftRightLeft;
leftRight.rightChild = leftRightRight;

left.leftChild = leftleft;
left.rightChild = leftRight;

let right = new TreeNode("ABS");
let rightLeft = new TreeNode("z");
let rightRight = new TreeNode("z");
right.leftChild = rightLeft;
right.rightChild = rightRight;

root.leftChild = left;
root.rightChild = right;

console.log("ImprovedDataStructur");
console.log(TreeNode.toString(root));