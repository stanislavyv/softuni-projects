namespace Tree
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class Tree<T> : IAbstractTree<T>
    {
        private readonly List<Tree<T>> _children;

        public Tree(T key)
        {
            this.Key = key;
            this._children = new List<Tree<T>>();
        }
        public Tree(T key, params Tree<T>[] children) : this(key)
        {
            foreach (var child in children)
            {
                this.AddChild(child);
                child.AddParent(this);
            }
        }

        public T Key { get; private set; }
        public Tree<T> Parent { get; private set; }


        public IReadOnlyCollection<Tree<T>> Children
            => this._children.AsReadOnly();

        public void AddChild(Tree<T> child)
        {
            this._children.Add(child);
        }
        public void AddParent(Tree<T> parent)
        {
            this.Parent = parent;
        }
        public string GetAsString()
        {
            var result = new StringBuilder();
            this.DfsAsString(this, result, 0);

            return result.ToString().Trim();
        }
        public Tree<T> GetDeepestLeftomostNode()
        {
            var leaves = this.GetLeavesBfs(this);

            var maxDepth = -1;
            Tree<T> deepestNode = null;

            foreach (var leaf in leaves)
            {
                var currentNode = leaf;
                var currentDepth = this.GetDepth(leaf);

                if (currentDepth > maxDepth)
                {
                    deepestNode = leaf;
                    maxDepth = currentDepth;
                }
            }

            return deepestNode;
        }
        public List<T> GetLeafKeys()
        {
            Predicate<Tree<T>> predicate = (t)
                => this.isLeaf(t);

            return this.OrderBfs(this, predicate);
        }
        public List<T> GetMiddleKeys()
        {
            Predicate<Tree<T>> predicate = (t)
                => this.isMiddle(t);

            return this.OrderBfs(this, predicate);
        }
        public List<T> GetLongestPath()
        {
            var result = new List<T>();
            var deepestNode = this.GetDeepestLeftomostNode();

            var currentNode = deepestNode;
            while (currentNode != null)
            {
                result.Add(currentNode.Key);
                currentNode = currentNode.Parent;
            }

            result.Reverse();
            return result;
        }
        public List<List<T>> PathsWithGivenSum(int sum)
        {
            var currentPath = new List<T>();
            var currentSum = 0;
            var result = new List<List<T>>();

            this.GetPathsSumDfs(this, sum, ref currentSum, currentPath, result);
            return result;
        }
        public List<Tree<T>> SubTreesWithGivenSum(int sum)
        {
            var result = new List<Tree<T>>();
            var nodes = this.OrderBfs(this);

            foreach (var node in nodes)
            {
                var currentSum = this.GetSubreeSumBfs(node);
                if (currentSum == sum) { result.Add(node); }
            }

            return result;
        }

        private bool isLeaf(Tree<T> node)
        {
            return node.Children.Count == 0;
        }
        private bool isMiddle(Tree<T> node)
        {
            return node.Parent != null && node.Children.Count > 0;
        }
        private void DfsAsString(Tree<T> node, StringBuilder result, int indent)
        {
            result.Append(new string(' ', indent))
                  .Append($"{node.Key}\r\n");

            foreach (var child in node.Children)
            {
                this.DfsAsString(child, result, indent + 2);
            }
        }
        private void GetPathsSumDfs(Tree<T> node, int wantedSum, ref int currentSum, List<T> currentPath, List<List<T>> result)
        {
            currentSum += Convert.ToInt32(node.Key);
            currentPath.Add(node.Key);

            foreach (var child in node.Children)
            {
                this.GetPathsSumDfs(child, wantedSum, ref currentSum, currentPath, result);
            }

            if (currentSum == wantedSum)
            {
                result.Add(new List<T>(currentPath));
            }

            currentSum -= Convert.ToInt32(node.Key);
            currentPath.RemoveAt(currentPath.Count - 1);

            // THIS WORKS AS WELL BUT IT'S NEARLY NOT AS OPTIMAL
            //private void GetPathsSumDfs(Tree<T> node, int wantedSum, List<List<T>> result)
            //{
            //    foreach (var child in node.Children)
            //    {
            //        this.GetPathsSumDfs(child, wantedSum, result);
            //    }

            //    var currentNode = node;
            //    var currentPath = new List<T>();
            //    var currentSum = 0;
            //    while (currentNode != null)
            //    {
            //        currentSum += Convert.ToInt32(currentNode.Key);
            //        currentPath.Add(currentNode.Key);
            //        currentNode = currentNode.Parent;
            //    }

            //    if (currentSum == wantedSum)
            //    {
            //        currentPath.Reverse();
            //        result.Add(currentPath);
            //    }
            //}
        }
        private List<Tree<T>> OrderBfs(Tree<T> node)
        {
            var result = new List<Tree<T>>();
            var nodes = new Queue<Tree<T>>();

            nodes.Enqueue(node);
            while (nodes.Count > 0)
            {
                var currentNode = nodes.Dequeue();
                foreach (var child in currentNode.Children)
                {
                    nodes.Enqueue(child);
                }
                result.Add(currentNode);
            }

            return result;
        }
        private List<T> OrderBfs(Tree<T> node, Predicate<Tree<T>> predicate)
        {
            var nodes = new Queue<Tree<T>>();
            var result = new List<T>();

            nodes.Enqueue(node);
            while (nodes.Count > 0)
            {
                var current = nodes.Dequeue();
                foreach (var child in current.Children)
                {
                    nodes.Enqueue(child);
                }

                if (predicate(current))
                {
                    result.Add(current.Key);
                }
            }

            return result;
        }
        private ICollection<Tree<T>> GetLeavesBfs(Tree<T> node)
        {
            var nodes = new Queue<Tree<T>>();
            var result = new List<Tree<T>>();

            nodes.Enqueue(this);
            while (nodes.Count > 0)
            {
                var current = nodes.Dequeue();
                foreach (var child in current.Children)
                {
                    nodes.Enqueue(child);
                }

                if (this.isLeaf(current))
                {
                    result.Add(current);
                }
            }

            return result;
        }
        private int GetDepth(Tree<T> node)
        {
            var currentDepth = 0;
            while (node.Parent != null)
            {
                node = node.Parent;
                currentDepth++;
            }

            return currentDepth;
        }
        private int GetSubreeSumBfs(Tree<T> node)
        {
            var nodes = new Queue<Tree<T>>();
            var sum = 0;

            nodes.Enqueue(node);
            while (nodes.Count > 0)
            {
                var currentNode = nodes.Dequeue();
                foreach (var child in currentNode.Children)
                {
                    nodes.Enqueue(child);
                }

                sum += Convert.ToInt32(currentNode.Key);
            }

            return sum;
        }
    }
}
