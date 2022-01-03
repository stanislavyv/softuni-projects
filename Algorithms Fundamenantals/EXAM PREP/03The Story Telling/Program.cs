using System;
using System.Collections.Generic;
using System.Linq;

namespace _03The_Story_Telling
{
    class Program
    {
        static Dictionary<string, List<string>> graph;
        static Dictionary<string, int> ancestorsCount;

        static void Main(string[] args)
        {
            graph = new Dictionary<string, List<string>>();
            ancestorsCount = new Dictionary<string, int>();
            ProcessInput();

            var result = TopSort();
            Console.WriteLine(string.Join(' ', result));
        }

        private static List<string> TopSort()
        {
            var result = new List<string>();

            while (ancestorsCount.Any())
            {
                var curr = ancestorsCount.LastOrDefault(n => n.Value == 0);
                if (curr.Key == null) { break; }

                foreach (var child in graph[curr.Key])
                {
                    ancestorsCount[child]--;
                }

                ancestorsCount.Remove(curr.Key);
                result.Add(curr.Key);
            }

            return result;
        }

        private static void ProcessInput()
        {
            string input;
            while ((input = Console.ReadLine()) != "End")
            {
                var tokens = input.Split(" ->");
                var source = tokens[0];

                graph[source] = new List<string>();

                if (!ancestorsCount.ContainsKey(source))
                {
                    ancestorsCount[source] = 0;
                }

                if (tokens.Length > 1)
                {
                    var children = tokens[1].Split(' ', StringSplitOptions.RemoveEmptyEntries);
                    graph[source].AddRange(children);
                }

                foreach (var child in graph[source])
                {
                    if (!graph.ContainsKey(source))
                    {
                        graph[child] = new List<string>();
                    }

                    if (!ancestorsCount.ContainsKey(child))
                    {
                        ancestorsCount[child] = 0;
                    }

                    ancestorsCount[child] += 1;
                }
            }
        }
    }
}
