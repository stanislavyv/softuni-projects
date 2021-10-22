namespace _05.TopView
{
    using System;
    using System.Collections.Generic;

    public class BinaryTree<T> : IAbstractBinaryTree<T>
        where T : IComparable<T>
    {
        public BinaryTree(T value, BinaryTree<T> left, BinaryTree<T> right)
        {
            this.Value = value;
            this.LeftChild = left;
            this.RightChild = right;
        }

        public T Value { get; set; }
        public BinaryTree<T> LeftChild { get; set; }
        public BinaryTree<T> RightChild { get; set; }

        public List<T> TopView()
        {
            var result = new List<T>();

            GetLeft(this, result);
            GetRight(this.RightChild, result);

            return result;
        }

        private void GetLeft(IAbstractBinaryTree<T> node, List<T> result)
        {
            if (node == null) { return; }

            result.Add(node.Value);
            GetLeft(node.LeftChild, result);
        }
        private void GetRight(IAbstractBinaryTree<T> node, List<T> result)
        {
            if (node == null) { return; }

            result.Add(node.Value);
            GetRight(node.RightChild, result);
        }
    }
}
