export class TreeNode {
    constructor(value, parent) {
        this.Value = value;
        this.Parent = parent;
        this.LeftChild = null;
        this.RightChild = null;
    }

    static FindNode(root, value) {
        if (root == null) {
            return null;
        }

        if (root.Value === value) {
            return root;
        }

        let node = TreeNode.FindNode(root.LeftChild, value);
        if (node != null) {
            return node;
        }

        let node2 = TreeNode.FindNode(root.RightChild, value);
        return node2 || null;
    }

    static ToString(root, depth = 0) {
        if (root == null) {
            return "";
        }

        let result = " ".repeat(depth * 2) + root.Value + "\n";
        result += TreeNode.ToString(root.LeftChild, depth + 1);
        result += TreeNode.ToString(root.RightChild, depth + 1);
        return result;
    }
}

let root = new TreeNode("ABS", null);
let leftChild = new TreeNode("App", null);
let leftleft = new TreeNode("\\x", null);
let leftRight = new TreeNode("App", null);
let leftRightLeft = new TreeNode("\\y", null);
let leftRightRight = new TreeNode("y", null);

leftRight.leftChild = leftRightLeft;
leftRight.rightChild = leftRightRight;

leftChild.leftChild = leftleft;
leftChild.rightChild = leftRight;

let rightChild = new TreeNode("App", null);
let rightLeft = new TreeNode("\\z", null);
let rightRight = new TreeNode("z", null);
rightChild.leftChild = rightLeft;
rightChild.rightChild = rightRight;

root.leftChild = leftChild;
root.rightChild = rightChild;

console.log("ImprovedDataStructur");
console.log(TreeNode.ToString(root));
