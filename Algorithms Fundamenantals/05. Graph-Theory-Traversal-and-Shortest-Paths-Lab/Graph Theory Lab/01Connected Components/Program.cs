using System;
using System.Collections.Generic;
using System.Linq;

namespace _01Connected_Components
{
    class Program
    {
        static bool[] visited;
        // index is node and value is children
        static List<List<int>> graph;

        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            visited = new bool[n];
            graph = new List<List<int>>(n);

            FillGraph(n);
            for (int i = 0; i < n; i++)
            {
                if (!visited[i])
                {
                    Console.Write("Connected component: ");
                    DFS(i);
                    Console.WriteLine();
                }
            }
        }

        private static void DFS(int vertex)
        {
            if (!visited[vertex])
            {
                visited[vertex] = true;
                foreach (var child in graph[vertex])
                {
                    DFS(child);
                }
                Console.Write(vertex + " ");
            }
        }
        private static void FillGraph(int n)
        {
            for (int i = 0; i < n; i++)
            {
                var input = Console.ReadLine();
                if (string.IsNullOrEmpty(input) || input == " ")
                {
                    graph.Add(new List<int>());
                    continue;
                }

                var children = input
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                graph.Add(new List<int>());

                if (children.Length != 0)
                {
                    foreach (var child in children)
                    {
                        graph[i].Add(child);
                    }
                }
            }
        }
    }
}
