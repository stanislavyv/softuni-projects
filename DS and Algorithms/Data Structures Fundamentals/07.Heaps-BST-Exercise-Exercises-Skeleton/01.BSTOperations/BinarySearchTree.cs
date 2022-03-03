namespace _01.BSTOperations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class BinarySearchTree<T> : IAbstractBinarySearchTree<T>
        where T : IComparable<T>
    {
        public BinarySearchTree()
        {
            // TODO: FIX COPY CONSTRUCTOR - THE FUCK IS WRONG WITH IT!????!/!/!?!/!
        }

        public BinarySearchTree(Node<T> root)
        {
            this.Copy(root);
        }

        public Node<T> Root { get; private set; }
        public Node<T> LeftChild => this.Root.LeftChild;
        public Node<T> RightChild => this.Root.RightChild;
        public T Value => this.Root.Value;
        public int Count => this.GetCount(this.Root);

        public bool Contains(T element)
        {
            var children = new Queue<Node<T>>();
            children.Enqueue(this.Root);

            while (children.Any())
            {
                var curr = children.Dequeue();

                if (this.AreEqual(element, curr.Value)) { return true; }

                if (curr.LeftChild != null) { children.Enqueue(curr.LeftChild); }
                if (curr.RightChild != null) { children.Enqueue(curr.RightChild); }
            }

            return false;
        }
        public void Insert(T element)
        {
            var source = this.InsertDFS(element, this.Root);

            // If element already exists in BST
            if (source == null) { return; }

            if (this.Root == null)
            {
                this.Root = source;
                return;
            }

            var toInsert = new Node<T>(element);
            if (this.IsLess(toInsert.Value, source.Value))
            {
                source.LeftChild = toInsert;
            }
            else if (this.IsGreater(toInsert.Value, source.Value))
            {
                source.RightChild = toInsert;
            }
        }
        public IAbstractBinarySearchTree<T> Search(T element)
        {
            var node = new Node<T>(element);
            return this.SearchDFS(node, this.Root);
        }
        public void EachInOrder(Action<T> action)
        {
            this.InOrderAction(this.Root, action);
        }
        public List<T> Range(T lower, T upper)
        {
            var output = new List<T>();
            this.RangeInOrder(this.Root, lower, upper, output);
            return output;
        }
        public void DeleteMin()
        {
            var source = this.FindMinElement(this.Root);

            if (source == null)
            {
                throw new InvalidOperationException("BST is empty!");
            }

            var minEl = source.LeftChild;
            // If current minEl has a right child, it becomes the new minEl, otherwise it's null
            var newMin = minEl.RightChild;

            source.LeftChild = newMin;
        }
        public void DeleteMax()
        {
            var source = this.FindMaxElement(this.Root);

            if (source == null)
            {
                throw new InvalidOperationException("BST is empty!");
            }

            var maxEl = source.RightChild;
            // If current maxEl has a left child, it becomes the new maxEl, otherwise it's null
            var newMax = maxEl.LeftChild;

            source.RightChild = newMax;
        }
        public int GetRank(T element)
        {
            return this.RankDFS(element, this.Root);
        }

        private int GetCount(Node<T> curr)
        {
            if (curr == null) { return 0; }
            return this.GetCount(curr.LeftChild) + this.GetCount(curr.RightChild) + 1;
        }
        private void Copy(Node<T> node)
        {
            if (node != null)
            {
                this.Insert(node.Value);
                this.Copy(node.LeftChild);
                this.Copy(node.RightChild);
            }
        }
        private bool IsLess(T first, T second)
        {
            return first.CompareTo(second) < 0;
        }
        private bool IsGreater(T first, T second)
        {
            return first.CompareTo(second) > 0;
        }
        private bool AreEqual(T first, T second)
        {
            return first.CompareTo(second) == 0;
        }
        /// <summary>
        /// Returns the source of element toInsert
        /// </summary>
        /// <param name="toInsert"></param>
        /// <param name="prev"></param>
        /// <param name="curr"></param>
        /// <returns></returns>
        private Node<T> InsertDFS(T element, Node<T> curr = null, Node<T> prev = null)
        {
            // Insert root if BST is empty
            if (curr == null && prev == null)
            {
                curr = new Node<T>(element);
                return curr;
            }

            // Return source if an empty node is found
            if (curr == null) { return prev; }

            // Return null if node already exists in BST
            if (this.AreEqual(element, curr.Value)) { return null; }

            prev = curr;
            curr = this.IsLess(element, curr.Value)
                ? curr.LeftChild
                : curr.RightChild;

            return InsertDFS(element, curr, prev);
        }
        private void InOrderAction(Node<T> node, Action<T> action)
        {
            if (node == null)
            {
                return;
            }

            this.InOrderAction(node.LeftChild, action);
            action(node.Value);
            this.InOrderAction(node.RightChild, action);
        }
        private IAbstractBinarySearchTree<T> SearchDFS(Node<T> toSearch, Node<T> curr)
        {
            if (curr == null) { return null; }

            if (this.AreEqual(toSearch.Value, curr.Value)) { return new BinarySearchTree<T>(curr); }

            curr = this.IsLess(toSearch.Value, curr.Value)
                ? curr.LeftChild
                : curr.RightChild;

            return this.SearchDFS(toSearch, curr);
        }
        private bool IsInRange(T element, T lower, T upper)
        {
            return element.CompareTo(lower) >= 0 && element.CompareTo(upper) <= 0;
        }
        private void RangeInOrder(Node<T> curr, T lower, T upper, List<T> list)
        {
            if (curr == null) { return; }

            this.RangeInOrder(curr.LeftChild, lower, upper, list);

            if (this.IsInRange(curr.Value, lower, upper))
            {
                list.Add(curr.Value);
            }

            this.RangeInOrder(curr.RightChild, lower, upper, list);
        }
        /// <summary>
        /// Returns the source of the min element in the BST.
        /// </summary>
        /// <param name="curr"></param>
        /// <param name="prev"></param>
        private Node<T> FindMinElement(Node<T> curr, Node<T> prev = null)
        {
            // If BST is empty
            if (curr == null && prev == null) { return null; }

            if (curr.LeftChild == null) { return prev; }

            return this.FindMinElement(curr.LeftChild, curr);
        }
        /// <summary>
        /// Returns the source of the max element in the BST.
        /// </summary>
        /// <param name="curr"></param>
        /// <param name="prev"></param>
        private Node<T> FindMaxElement(Node<T> curr, Node<T> prev = null)
        {
            // If BST is empty
            if (curr == null && prev == null) { return null; }

            if (curr.RightChild == null) { return prev; }

            return this.FindMaxElement(curr.RightChild, curr);
        }
        private int RankDFS(T element, Node<T> curr)
        {
            if (curr == null) { return 0; }

            if (this.IsGreater(curr.Value, element))
            {
                return this.RankDFS(element, curr.LeftChild);
            }

            if (this.AreEqual(element, curr.Value))
            {
                return this.GetCount(curr);
            }

            return this.GetCount(curr.LeftChild) + 1 +
                this.RankDFS(element, curr.RightChild);
        }
    }
}
