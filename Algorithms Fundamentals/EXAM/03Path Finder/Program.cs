using System;
using System.Collections.Generic;
using System.Linq;

namespace _03Path_Finder
{
    class Program
    {
        static Dictionary<int, List<int>> graph;
        static HashSet<int> visited;

        static void Main(string[] args)
        {
            graph = new Dictionary<int, List<int>>();
            var numNodes = int.Parse(Console.ReadLine());

            FillMatrix(numNodes);

            var numPaths = int.Parse(Console.ReadLine());
            var paths = InitPaths(numPaths);
            Solve(paths);
        }

        private static void Solve(HashSet<int[]> paths)
        {
            foreach (var path in paths)
            {
                var exists = CheckPathExistsBFS(path);
                var result = exists ? "yes" : "no";
                Console.WriteLine(result);
            }
        }
        private static HashSet<int[]> InitPaths(int numPaths)
        {
            var paths = new HashSet<int[]>();

            for (int i = 0; i < numPaths; i++)
            {
                var currPath = Console.ReadLine()
                              .Split()
                              .Select(int.Parse)
                              .ToArray();
                paths.Add(currPath);
            }

            return paths;
        }
        private static bool CheckPathExistsBFS(int[] path)
        {
            visited = new HashSet<int>();
            var start = path[0];
            var end = path[path.Length - 1];

            var queue = new Queue<int>();
            queue.Enqueue(start);

            var currIndex = 0;
            while (queue.Any())
            {
                var currNode = queue.Dequeue();
                visited.Add(currNode);

                if (currNode == end &&
                    currIndex == path.Length - 1)
                {
                    return true;
                }

                foreach (var child in graph[currNode])
                {
                    if (!visited.Contains(child) &&
                        path[currIndex + 1] == child)
                    {
                        queue.Enqueue(child);
                        currIndex++;
                    }
                }
            }

            return false;
        }
        private static void FillMatrix(int numNodes)
        {
            for (int i = 0; i < numNodes; i++)
            {
                var currChildren = Console.ReadLine()
                                  .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                                  .Select(int.Parse);
                if (!graph.ContainsKey(i))
                {
                    graph[i] = new List<int>();
                }

                foreach (var child in currChildren)
                {
                    graph[i].Add(child);

                    if (!graph.ContainsKey(child))
                    {
                        graph[child] = new List<int>();
                    }
                }
            }
        }
    }
}