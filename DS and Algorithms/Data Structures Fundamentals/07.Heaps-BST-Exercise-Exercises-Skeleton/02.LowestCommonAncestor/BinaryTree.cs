namespace _02.LowestCommonAncestor
{
    using System;
    using System.Collections.Generic;

    public class BinaryTree<T> : IAbstractBinaryTree<T>
        where T : IComparable<T>
    {
        public BinaryTree(
            T value,
            BinaryTree<T> leftChild,
            BinaryTree<T> rightChild)
        {
            this.Value = value;
            this.LeftChild = leftChild;
            this.RightChild = rightChild;
        }

        public T Value { get; set; }
        public BinaryTree<T> LeftChild { get; set; }
        public BinaryTree<T> RightChild { get; set; }
        public BinaryTree<T> Parent { get; set; }

        // I decided to use this iterative solution because nodes don't keep a reference to their parents (see BinaryTree init in LCATests.cs)
        public T FindLowestCommonAncestor(T first, T second)
        {
            var firstPath = this.Search(first);
            var secondPath = this.Search(second);

            if (firstPath == null || secondPath == null) { return default; }

            var longerPath = this.GetLongerPath(firstPath, secondPath);
            var shorterPath = this.GetShorterPath(firstPath, secondPath);

            var firstNode = shorterPath.Peek();
            var secondNode = longerPath.Peek();

            // Removing the unneccessary ancestors so the nodes are the same depth
            while (longerPath.Count > shorterPath.Count)
            {
                secondNode = longerPath.Pop();
            }

            while (shorterPath.Count > 0)
            {
                if (firstNode == secondNode)
                {
                    return firstNode.Value;
                }

                firstNode = shorterPath.Pop();
                secondNode = longerPath.Pop();
            }

            return default;
        }

        /// <summary>
        /// Returns a stack with the searched element and its ancestors
        /// </summary>
        /// <param name="element"></param>
        /// <param name="curr"></param>
        /// <param name="stack"></param>
        /// <returns></returns>
        private Stack<IAbstractBinaryTree<T>> Search(T element)
        {
            var output = new Stack<IAbstractBinaryTree<T>>();
            this.SearchDFS(element, this, output);

            return output.Count > 0 ?
                output : null;
        }
        private void SearchDFS(T element, IAbstractBinaryTree<T> curr, Stack<IAbstractBinaryTree<T>> output)
        {
            if (curr == null) { return; }

            output.Push(curr);
            if (curr.Value.Equals(element)) { return; }

            if (element.CompareTo(curr.Value) < 0)
            {
                this.SearchDFS(element, curr.LeftChild, output);
            }
            else
            {
                this.SearchDFS(element, curr.RightChild, output);
            }
        }
        private Stack<IAbstractBinaryTree<T>> GetLongerPath(Stack<IAbstractBinaryTree<T>> first, Stack<IAbstractBinaryTree<T>> second)
        {
            return first.Count > second.Count ?
                first :
                second;
        }
        private Stack<IAbstractBinaryTree<T>> GetShorterPath(Stack<IAbstractBinaryTree<T>> first, Stack<IAbstractBinaryTree<T>> second)
        {
            return first.Count < second.Count ?
                first :
                second;
        }
    }
}
