using System;
using System.Collections.Generic;

namespace _01Distance_Between_Vertices
{
    class Program
    {
        static Dictionary<string, List<string>> graph;
        static Dictionary<string, string> parents;
        static Dictionary<string, bool> visited;

        static void Main(string[] args)
        {
            var numVertices = int.Parse(Console.ReadLine());
            var numPairs = int.Parse(Console.ReadLine());

            graph = InitGraph(numVertices);
            parents = new Dictionary<string, string>();
            visited = new Dictionary<string, bool>();

            var shortestPaths = new List<Path>();
            for (int i = 0; i < numPairs; i++)
            {
                var tokens = Console.ReadLine().Split('-');

                var source = tokens[0];
                var destination = tokens[1];
                var length = GetShortestPath(source, destination);

                var currPath = new Path(source, destination, length);
                shortestPaths.Add(currPath);

                // So it makes variables usable for next iteration
                visited.Clear();
            }

            Print(shortestPaths);
        }

        private static void Print(List<Path> shortestPaths)
        {
            foreach (var path in shortestPaths)
            {
                Console.WriteLine("{" + path.Source + ", " + path.Destination + "} -> " + path.Length);
            }
        }

        private static int GetShortestPath(string source, string destination)
        {
            var queue = new Queue<string>();
            queue.Enqueue(source);

            while (queue.Count > 0)
            {
                var curr = queue.Dequeue();

                if (curr == destination)
                {
                    return GetPathLength(source, curr);
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

            return -1;
        }
        private static int GetPathLength(string source, string destination)
        {
            var length = 0;
            var curr = destination;

            while (curr != source)
            {
                curr = parents[curr];
                length++;
            }
            return length;
        }
        private static Dictionary<string, List<string>> InitGraph(int numVertices)
        {
            var graph = new Dictionary<string, List<string>>();

            for (int i = 0; i < numVertices; i++)
            {
                var tokens = Console.ReadLine().Split(':', StringSplitOptions.RemoveEmptyEntries);
                var source = tokens[0];
                string[] children = tokens.Length > 1
                    ? tokens[1].Split(' ') : null;

                if (!graph.ContainsKey(source))
                {
                    graph[source] = new List<string>();
                }

                if (children != null)
                {
                    foreach (var child in children)
                    {
                        graph[source].Add(child);
                    }
                }
            }

            return graph;
        }
    }
}
