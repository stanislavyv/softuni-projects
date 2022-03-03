namespace _01.BinaryTree
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class BinaryTree<T> : IAbstractBinaryTree<T>
    {
        public BinaryTree(T value,
            IAbstractBinaryTree<T> leftChild,
            IAbstractBinaryTree<T> rightChild)
        {
            this.Value = value;
            this.LeftChild = leftChild;
            this.RightChild = rightChild;
        }

        public T Value { get; private set; }
        public IAbstractBinaryTree<T> LeftChild { get; private set; }
        public IAbstractBinaryTree<T> RightChild { get; private set; }

        public string AsIndentedPreOrder(int indent)
        {
            var result = new StringBuilder();
            this.IndentPreOrder(indent, this, result);
            return result.ToString().TrimEnd();
        }
        public List<IAbstractBinaryTree<T>> InOrder()
        {
            var result = new List<IAbstractBinaryTree<T>>();
            this.AddInOrder(this, result);
            return result;
        }
        public List<IAbstractBinaryTree<T>> PostOrder()
        {
            var result = new List<IAbstractBinaryTree<T>>();
            this.AddPostOrder(this, result);
            return result;
        }
        public List<IAbstractBinaryTree<T>> PreOrder()
        {
            var result = new List<IAbstractBinaryTree<T>>();
            this.AddPreOrder(this, result);
            return result;
        }
        public void ForEachInOrder(Action<T> action)
        {
            this.AddInOrder(this, action);
        }

        private void IndentPreOrder(int indent,
            IAbstractBinaryTree<T> node,
            StringBuilder result)
        {
            if (node == null) { return; }

            result.AppendLine(new string(' ', indent) + node.Value);
            this.IndentPreOrder(indent + 2, node.LeftChild, result);
            this.IndentPreOrder(indent + 2, node.RightChild, result);
        }
        private void AddInOrder(IAbstractBinaryTree<T> node, List<IAbstractBinaryTree<T>> result)
        {
            if (node == null) { return; }

            this.AddInOrder(node.LeftChild, result);
            result.Add(node);
            this.AddInOrder(node.RightChild, result);
        }
        private void AddInOrder(IAbstractBinaryTree<T> node, Action<T> action)
        {
            if (node == null) { return; }

            this.AddInOrder(node.LeftChild, action);
            action(node.Value);
            this.AddInOrder(node.RightChild, action);
        }
        private void AddPostOrder(IAbstractBinaryTree<T> node, List<IAbstractBinaryTree<T>> result)
        {
            if (node == null) { return; }

            this.AddPostOrder(node.LeftChild, result);
            this.AddPostOrder(node.RightChild, result);
            result.Add(node);
        }
        private void AddPreOrder(IAbstractBinaryTree<T> node, List<IAbstractBinaryTree<T>> result)
        {
            if (node == null) { return; }

            result.Add(node);
            this.AddPreOrder(node.LeftChild, result);
            this.AddPreOrder(node.RightChild, result);
        }
    }
}
