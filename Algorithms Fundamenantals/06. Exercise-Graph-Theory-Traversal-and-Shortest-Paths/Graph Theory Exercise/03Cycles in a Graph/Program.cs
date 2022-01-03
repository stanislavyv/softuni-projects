using System;
using System.Collections.Generic;

namespace _03Cycles_in_a_Graph
{
    class Program
    {
        static Dictionary<string, string> graph;
        static HashSet<string> visited;
        static HashSet<string> cycles;

        static void Main(string[] args)
        {
            graph = InitGraph();
            visited = new HashSet<string>();
            cycles = new HashSet<string>();

            foreach (var vertex in graph.Keys)
            {
                try
                {
                    DFS(vertex);
                }
                catch (InvalidOperationException err)
                {
                    Console.WriteLine(err.Message);
                    return;
                }
            }

            Console.WriteLine("Acyclic: Yes");
        }

        private static void DFS(string vertex)
        {
            if (cycles.Contains(vertex))
            {
                throw new InvalidOperationException("Acyclic: No");
            }

            // When node has no child
            if (!graph.ContainsKey(vertex))
            {
                return;
            }

            if (visited.Contains(vertex))
            {
                return;
            }

            visited.Add(vertex);
            cycles.Add(vertex);
            
            // graph - dict; vertex -> child
            DFS(graph[vertex]);
            cycles.Remove(vertex);
        }
        private static Dictionary<string, string> InitGraph()
        {
            var graph = new Dictionary<string, string>();

            string input;
            while ((input = Console.ReadLine()) != "End")
            {
                var tokens = input.Split('-');
                var source = tokens[0];
                var destination = tokens[1];

                // Every vertice has only one child (task condition)
                graph[source] = destination;
            }

            return graph;
        }
    }
}
