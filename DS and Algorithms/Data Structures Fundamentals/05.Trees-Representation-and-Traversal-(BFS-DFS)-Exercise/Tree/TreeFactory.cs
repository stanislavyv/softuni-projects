namespace Tree
{
    using System.Collections.Generic;

    public class TreeFactory
    {
        private Dictionary<int, Tree<int>> nodesByKeys;

        public TreeFactory()
        {
            this.nodesByKeys = new Dictionary<int, Tree<int>>();
        }

        public Tree<int> CreateTreeFromStrings(string[] input)
        {
            foreach (var line in input)
            {
                var nodeKeys = line.Split(' ');

                var parentKey = int.Parse(nodeKeys[0]);
                var childKey = int.Parse(nodeKeys[1]);

                this.AddEdge(parentKey, childKey);
            }

            return this.GetRoot();
        }
        public Tree<int> CreateNodeByKey(int key)
        {
            Tree<int> node;
            if (!this.nodesByKeys.ContainsKey(key))
            {
                node = new Tree<int>(key);
                this.nodesByKeys[key] = node;
            }
            else { node = this.nodesByKeys[key]; }

            return node;
        }
        public void AddEdge(int parentKey, int childKey)
        {
            var parentNode = this.CreateNodeByKey(parentKey);
            var childNode = this.CreateNodeByKey(childKey);

            parentNode.AddChild(childNode);
            childNode.AddParent(parentNode);
        }

        private Tree<int> GetRoot()
        {
            Tree<int> root = null;
            foreach (var node in this.nodesByKeys.Values)
            {
                if (node.Parent == null)
                {
                    root = node;
                    break;
                }
            }

            return root;
        }
    }
}
