using System;
using System.Collections.Generic;
using System.Linq;

namespace _06RoadReconstruction
{
    class Program
    {
        static int numNodes;
        static Dictionary<int, List<int>> graph;
        static List<Edge> edges;
        static List<Edge> importantEdges;
        static HashSet<int> visited;

        //NOTE:
        // Works for undirected single graphs

        static void Main(string[] args)
        {
            numNodes = int.Parse(Console.ReadLine());
            var numEdges = int.Parse(Console.ReadLine());

            graph = new Dictionary<int, List<int>>();
            edges = new List<Edge>();

            ProcessInput(numEdges);
            importantEdges = ExtractImportant();
            Print();
        }

        private static void Print()
        {
            Console.WriteLine("Important streets:");
            foreach (var edge in importantEdges)
            {
                if (edge.From > edge.To)
                {
                    Console.WriteLine(edge.Reverse());
                    continue;
                }

                Console.WriteLine(edge);
            }
        }
        private static List<Edge> ExtractImportant()
        {
            var important = new List<Edge>();

            foreach (var edge in edges)
            {
                graph[edge.From].Remove(edge.To);
                graph[edge.To].Remove(edge.From);

                if (!HasPath())
                {
                    important.Add(edge);
                }

                graph[edge.From].Add(edge.To);
                graph[edge.To].Add(edge.From);
            }

            return important;
        }
        private static bool HasPath()
        {
            visited = new HashSet<int>();
            var source = graph.First().Key;

            var queue = new Queue<int>();
            queue.Enqueue(source);

            while (queue.Count > 0)
            {
                var currNode = queue.Dequeue();
                visited.Add(currNode);

                foreach (var child in graph[currNode])
                {
                    if (!visited.Contains(child))
                    {
                        queue.Enqueue(child);
                    }
                }
            }

            return visited.Count == numNodes;
        }
        private static void ProcessInput(int numEdges)
        {
            for (int i = 0; i < numEdges; i++)
            {
                var tokens = Console.ReadLine().Split(" - ", StringSplitOptions.RemoveEmptyEntries);

                var source = int.Parse(tokens[0]);
                var destination = int.Parse(tokens[1]);

                if (!graph.ContainsKey(source))
                {
                    graph[source] = new List<int>();
                }

                // Doing this because otherwise if a node doesn't
                // have children it won't be iterable
                if (!graph.ContainsKey(destination))
                {
                    graph[destination] = new List<int>();
                }

                if (!graph[source].Contains(destination))
                {
                    graph[source].Add(destination);
                }

                if (!graph[destination].Contains(source))
                {
                    graph[destination].Add(source);
                }

                var edge = new Edge(source, destination);
                edges.Add(edge);
            }
        }
    }
}
