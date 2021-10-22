namespace Tree
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class Tree<T> : IAbstractTree<T>
    {
        private readonly List<Tree<T>> _children;
        private bool IsRootDeleted = false;

        public Tree(T value)
        {
            this.Parent = null;
            this.Value = value;
            this._children = new List<Tree<T>>();
        }
        public Tree(T value, params Tree<T>[] children)
            : this(value)
        {
            foreach (var child in children)
            {
                child.Parent = this;
                this._children.Add(child);
            }
        }

        public T Value { get; private set; }
        public Tree<T> Parent { get; private set; }
        public IReadOnlyCollection<Tree<T>> Children => this._children.AsReadOnly();

        public ICollection<T> OrderBfs()
        {
            var result = new List<T>();
            var toTraverse = new Queue<Tree<T>>();

            if (!this.IsRootDeleted)
            {
                toTraverse.Enqueue(this);

                while (toTraverse.Any())
                {
                    var curr = toTraverse.Dequeue();

                    foreach (var child in curr.Children)
                    {
                        toTraverse.Enqueue(child);
                    }

                    result.Add(curr.Value);
                }
            }

            return result;
        }
        public ICollection<T> OrderDfs()
        {
            var result = new List<T>();
            if (!this.IsRootDeleted)
            {
                this.DFS(this, result);
            }
            
            return result;
        }
        public void AddChild(T parentKey, Tree<T> child)
        {
            var node = this.FindBFS(parentKey);
            this.CheckIfNull(node);

            node._children.Add(child);
            child.Parent = node;
        }
        public void RemoveNode(T nodeKey)
        {
            var node = this.FindBFS(nodeKey);
            this.CheckIfNull(node);

            var parentNode = node.Parent;
            if (parentNode != null)
            {
                parentNode._children.Remove(node);
                parentNode = null;
            }
            else
            {
                this.IsRootDeleted = true;
            }

            foreach (var child in node.Children)
            {
                child.Parent = null;
            }

            node._children.Clear();
            node.Value = default;
        }
        public void Swap(T firstKey, T secondKey)
        {
            var firstNode = this.FindBFS(firstKey);
            var secondNode = this.FindBFS(secondKey);

            this.CheckIfNull(firstNode);
            this.CheckIfNull(secondNode);

            var firstParent = firstNode.Parent;
            var secondParent = secondNode.Parent;

            if (firstParent == null)
            {
                this.SwapRoot(firstNode, secondNode);
            }
            else if (secondParent == null)
            {
                this.SwapRoot(secondNode, firstNode);
            }
            else
            {
                var indexOfFirst = firstParent._children.IndexOf(firstNode);
                var indexOfSecond = secondParent._children.IndexOf(secondNode);

                firstParent._children[indexOfFirst] = secondNode;
                secondParent._children[indexOfSecond] = firstNode;

                firstNode.Parent = secondParent;
                secondNode.Parent = firstParent;
            }
        }

        private void DFS(Tree<T> node, List<T> result)
        {
            foreach (var child in node.Children)
            {
                this.DFS(child, result);
            }

            result.Add(node.Value);
        }
        private ICollection<T> DFSWithStack(Tree<T> node)
        {
            var result = new List<T>();
            var toTraverse = new Stack<Tree<T>>();

            toTraverse.Push(node);

            while (toTraverse.Any())
            {
                var curr = toTraverse.Pop();

                foreach (var child in curr.Children)
                {
                    toTraverse.Push(child);
                }

                result.Add(curr.Value);
            }

            result.Reverse();
            return result;
        }
        private void CheckIfNull(Tree<T> node)
        {
            if (node == null)
            {
                throw new ArgumentNullException();
            }
        }
        private Tree<T> FindBFS(T keyValue)
        {
            var toTraverse = new Queue<Tree<T>>();
            toTraverse.Enqueue(this);

            while (toTraverse.Any())
            {
                var curr = toTraverse.Dequeue();

                foreach (var child in curr.Children)
                {
                    toTraverse.Enqueue(child);
                }

                if (curr.Value.Equals(keyValue))
                { return curr; }
            }

            return null;
        }
        private void SwapRoot(Tree<T> oldRoot, Tree<T> newRoot)
        {
            foreach (var child in oldRoot.Children)
            {
                child.Parent = null;
            }
            oldRoot._children.Clear();

            foreach (var child in newRoot.Children)
            {
                oldRoot._children.Add(child);
            }
            oldRoot.Value = newRoot.Value;
        }
    }
}
