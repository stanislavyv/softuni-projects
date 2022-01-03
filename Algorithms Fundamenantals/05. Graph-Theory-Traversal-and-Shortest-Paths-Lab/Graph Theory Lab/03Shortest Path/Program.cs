using System;
using System.Collections.Generic;

namespace _03Shortest_Path
{
    class Program
    {
        static Dictionary<string, List<string>> graph;
        static Dictionary<string, bool> visited;
        static Dictionary<string, string> parents;

        static void Main(string[] args)
        {
            var nodesCount = int.Parse(Console.ReadLine());
            var edgesCount = int.Parse(Console.ReadLine());
            graph = new Dictionary<string, List<string>>();
            visited = new Dictionary<string, bool>();
            // Key - child, value - parent
            parents = new Dictionary<string, string>();

            Init(edgesCount);
            var startNode = Console.ReadLine();
            var endNode = Console.ReadLine();

            ShortestPathBFS(startNode, endNode);
            var result = GetResult(startNode, endNode);

            Console.WriteLine($"Shortest path length is: {result.Count - 1}");
            Console.WriteLine($"{string.Join(' ', result)}");
        }

        private static Stack<string> GetResult(string startNode, string endNode)
        {
            var stack = new Stack<string>();
            stack.Push(endNode);

            var currParent = parents[endNode];
            while (currParent != startNode)
            {
                stack.Push(currParent);
                currParent = parents[currParent];
            }
            // This time currParent will be startNode
            stack.Push(currParent);

            return stack;
        }  
        // Works for unweighted graphs
        private static void ShortestPathBFS(string startNode, string endNode)
        {
            var queue = new Queue<string>();
            queue.Enqueue(startNode);

            while (queue.Count > 0)
            {
                var curr = queue.Dequeue();

                if (curr == endNode)
                {
                    return;
                }

                foreach (var child in graph[curr])
                {
                    if (!visited.ContainsKey(child))
                    {
                        visited[child] = true;
                        parents[child] = curr;
                        queue.Enqueue(child);
                    }
                }
            }
        }
        private static void Init(int edgesCount)
        {
            for (int i = 0; i < edgesCount; i++)
            {
                var tokens = Console.ReadLine().Split();

                var start = tokens[0];
                var destination = tokens[1];

                if (!graph.ContainsKey(start))
                {
                    graph[start] = new List<string>();
                }

                if (!graph.ContainsKey(destination))
                {
                    graph[destination] = new List<string>();
                }

                graph[start].Add(destination);
            }
        }
    }
}
