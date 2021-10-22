namespace _04.BinarySearchTree
{
    using System;

    public class BinarySearchTree<T> : IAbstractBinarySearchTree<T>
        where T : IComparable<T>
    {
        public BinarySearchTree()
        {
            //TODO: Opravi tupoto Search;
            //TODO: Vizh za ctor(Node<T> root) (https://youtu.be/hKht-W6wzC4?t=8487)
            //TODO: Opravi tupoto Insert ako se nalaga...
        }
        public BinarySearchTree(Node<T> root)
        {
            this.Copy(root);
        }

        public Node<T> Root { get; private set; }
        public Node<T> LeftChild => this.Root.LeftChild;
        public Node<T> RightChild => this.Root.RightChild;
        public T Value => this.Root.Value;

        public bool Contains(T element)
        {
            this.EnsureNotEmpty();
            return this.FindPreOrder(this.Root, element) != null;
        }
        public void Insert(T element)
        {
            Node<T> source = null;
            source = this.InsertRecursive(element, this.Root);

            // If element already exists in BST
            if (source == null) { return; }

            if (this.Root == null)
            {
                this.Root = source;
            }
            else
            {
                var toInsert = new Node<T>(element);
                if (this.IsGreater(element, source.Value))
                {
                    source.RightChild = toInsert;
                }
                else
                {
                    source.LeftChild = toInsert;
                }
            }
        }
        public IAbstractBinarySearchTree<T> Search(T element)
        {
            this.EnsureNotEmpty();
            return this.FindPreOrder(this.Root, element);
        }

        private void EnsureNotEmpty()
        {
            if (this.Root == null)
            {
                throw new InvalidOperationException("BST is empty!");
            }
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
        private bool IsGreater(T first, T second) => first.CompareTo(second) > 0;
        private bool AreEqual(T first, T second) => first.CompareTo(second) == 0;
        private IAbstractBinarySearchTree<T> FindPreOrder(Node<T> node, T searchedEl)
        {
            if (node != null)
            {
                if (this.AreEqual(node.Value, searchedEl)) { return new BinarySearchTree<T>(node); }

                node = this.IsGreater(searchedEl, node.Value)
                    ? node.RightChild
                    : node.LeftChild;

                return this.FindPreOrder(node, searchedEl);
            }
            return null;
        }
        /// <summary>
        /// Returns the node that acts as source to inserted element.
        /// </summary>
        /// <param name="node"></param>
        /// <param name="toInsert"></param>
        /// <returns></returns>
        private Node<T> InsertRecursive(T toInsert, Node<T> node = null, Node<T> prev = null)
        {
            // Insert root if BST is empty
            if (node == null && prev == null)
            {
                node = new Node<T>(toInsert);
                return node;
            }

            // Return current source if an empty node is found
            if (node == null)
            {
                return prev;
            }

            // Return null if element already exists in BST
            if (this.AreEqual(node.Value, toInsert))
            {
                return null;
            }

            prev = node;
            node = this.IsGreater(toInsert, node.Value)
                ? node.RightChild
                : node.LeftChild;

            return this.InsertRecursive(toInsert, node, prev);
        }
    }
}
