using System;
using System.Collections.Generic;
using System.Linq;

namespace _05Break_Cycles
{
    class Program
    {
        static Dictionary<string, List<string>> graph;
        static List<Edge> edges;
        static HashSet<string> visited;
        static List<Edge> removedEdges;

        static void Main(string[] args)
        {
            var numNodes = int.Parse(Console.ReadLine());
            graph = new Dictionary<string, List<string>>();
            edges = new List<Edge>();
            removedEdges = new List<Edge>();

            ProcessInput(numNodes);

            edges = edges
                   .OrderBy(e => e.From)
                   .ThenBy(e => e.To)
                   .ToList();

            BreakCycles();

            Console.WriteLine($"Edges to remove: {removedEdges.Count}");
            foreach (var edge in removedEdges)
            {
                Console.WriteLine(edge);
            }
        }

        private static void BreakCycles()
        {
            foreach (var edge in edges)
            {
                graph[edge.From].Remove(edge.To);
                graph[edge.To].Remove(edge.From);

                if (HasPath(edge.From, edge.To))
                {
                    removedEdges.Add(edge);
                }
                else
                {
                    graph[edge.From].Add(edge.To);
                    graph[edge.To].Add(edge.From);
                }
            }
        }

        private static bool HasPath(string source, string destination)
        {
            visited = new HashSet<string>();
            var queue = new Queue<string>();
            queue.Enqueue(source);

            while (queue.Count > 0)
            {
                var node = queue.Dequeue();
                visited.Add(node);

                if (node == destination) { return true; }

                foreach (var child in graph[node])
                {
                    if (!visited.Contains(child))
                    {
                        queue.Enqueue(child);
                    }
                }
            }

            return false;
        }
        /// <summary>
        /// Checks whether a reversed edge already exists in set (A -> Z == Z -> A)
        /// </summary>
        private static bool CheckIfEdgeExists(Edge edge)
        {
            return edges.FirstOrDefault(e => e.To == edge.From && e.To == edge.From)
                != null;
        }
        private static void ProcessInput(int numNodes)
        {
            for (int i = 0; i < numNodes; i++)
            {
                var tokens = Console.ReadLine()
                            .Split(" -> ", StringSplitOptions.RemoveEmptyEntries);

                var source = tokens[0];
                var children = tokens.Length > 1 ?
                    tokens[1].Split(' ') : null;

                if (!graph.ContainsKey(source))
                {
                    graph[source] = new List<string>();
                }

                if (children != null)
                {
                    foreach (var child in children)
                    {
                        graph[source].Add(child);

                        var edge = new Edge(source, child);
                        if (!CheckIfEdgeExists(edge))
                        {
                            edges.Add(edge);
                        }
                    }
                }
            }
        }
    }
}
