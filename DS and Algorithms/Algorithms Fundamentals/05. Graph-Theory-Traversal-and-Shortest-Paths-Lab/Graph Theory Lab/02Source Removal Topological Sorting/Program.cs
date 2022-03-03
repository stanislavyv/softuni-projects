using System;
using System.Collections.Generic;
using System.Linq;

namespace _02Source_Removal_Topological_Sorting
{
    class Program
    {
        static Dictionary<string, string[]> graph;
        static Dictionary<string, int> predecessorsCount;

        static void Main(string[] args)
        {
            // TODO: SOLVE IT RECURSIVELY (DFS)

            var n = int.Parse(Console.ReadLine());
            FillGraph(n);
            GetPredecessorCount();
            var result = TopologicalSort();

            if (predecessorsCount.Count > 0)
            {
                Console.WriteLine("Invalid topological sorting");
            }
            else
            {
                Console.WriteLine($"Topological sorting: {string.Join(", ", result)}");
            }
        }

        // Source removal approach
        private static List<string> TopologicalSort()
        {
            var result = new List<string>();
            while (predecessorsCount.Any())
            {
                var node = predecessorsCount
                          .FirstOrDefault(n => n.Value == 0);

                // the default value of KeyValuePair<string, int> == [null, 0]
                if (node.Key == null) { break; }

                foreach (var child in graph[node.Key])
                {
                    predecessorsCount[child]--;
                }

                predecessorsCount.Remove(node.Key);
                result.Add(node.Key);
            }

            return result;
        }
        private static void GetPredecessorCount()
        {
            predecessorsCount = new Dictionary<string, int>();

            foreach (var kvp in graph)
            {
                var node = kvp.Key;
                var children = kvp.Value;

                if (!predecessorsCount.ContainsKey(node))
                {
                    predecessorsCount[node] = 0;
                }

                foreach (var child in children)
                {
                    if (!predecessorsCount.ContainsKey(child))
                    {
                        predecessorsCount[child] = 0;
                    }

                    predecessorsCount[child]++;
                }
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
