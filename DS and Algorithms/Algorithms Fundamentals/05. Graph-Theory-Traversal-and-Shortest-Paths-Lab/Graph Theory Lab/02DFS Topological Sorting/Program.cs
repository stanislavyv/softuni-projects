using System;
using System.Collections.Generic;
using System.Linq;

namespace _02DFS_Topological_Sorting
{
    class Program
    {
        static Dictionary<string, string[]> graph;

        static HashSet<string> visited;
        static HashSet<string> cycles;

        static void Main(string[] args)
        {
            // TODO: SOLVE IT RECURSIVELY (DFS)

            var n = int.Parse(Console.ReadLine());
            FillGraph(n);
            var result = TopologicalSort();

            Console.WriteLine($"Topological sorting: {string.Join(", ", result)}");
        }

        // DFS approach
        private static Stack<string> TopologicalSort()
        {
            visited = new HashSet<string>();
            cycles = new HashSet<string>();

            var result = new Stack<string>();

            foreach (var vertex in graph.Keys)
            {
                TopologicalSortDFS(vertex, result);
            }

            return result;
        }
        private static void TopologicalSortDFS(string vertex, Stack<string> result)
        {
            if (cycles.Contains(vertex))
            {
                throw new InvalidOperationException("Topological sorting can't be done when a cycle is present.");
            }

            if (!visited.Contains(vertex))
            {
                cycles.Add(vertex);
                visited.Add(vertex);

                var children = graph[vertex];

                foreach (var child in children)
                {
                    TopologicalSortDFS(child, result);
                }

                cycles.Remove(vertex);
                result.Push(vertex);
            }
        }
        private static void FillGraph(int n)
        {
            graph = new Dictionary<string, string[]>();
            for (int i = 0; i < n; i++)
            {
                var input = Console.ReadLine();
                var tokens = input.Split(" -> ");

                var source = tokens[0];

                if (tokens.Length == 1)
                {
                    // Removing the " -> ", because of input:
                    // if input is "F ->" (without children)
                    // the " ->" stays as part of source
                    source = input.Split(" ->")[0];
                    graph[source] = new string[0];
                    continue;
                }

                var children = tokens[1].Split(", ");

                graph[source] = children;
            }
        }
    }
}
