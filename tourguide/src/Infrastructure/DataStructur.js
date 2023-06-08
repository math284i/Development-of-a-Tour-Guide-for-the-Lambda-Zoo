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
