using System;
using System.Collections.Generic;

namespace _04Salaries
{
    class Program
    {
        static List<List<int>> graph;
        static Dictionary<int, int> employeeSums;

        static void Main(string[] args)
        {
            var numEmployees = int.Parse(Console.ReadLine());
            InitGraph(numEmployees);
            employeeSums = new Dictionary<int, int>();

            var sum = 0;
            for (int i = 0; i < numEmployees; i++)
            {
                sum += GetSumDFS(i);
            }

            Console.WriteLine(sum);
        }

        private static int GetSumDFS(int employee)
        {
            if (employeeSums.ContainsKey(employee))
            {
                return employeeSums[employee];
            }

            // If an employee isn't a direct manager, his salary
            // is the sum of his employees' salaries,
            // otherwise it's 1
            var currSum = graph[employee].Count > 0 ? 0 : 1;

            foreach (var child in graph[employee])
            {
                currSum += GetSumDFS(child);
            }

            employeeSums[employee] = currSum;
            return currSum;
        }
        private static void InitGraph(int numEmployees)
        {
            graph = new List<List<int>>();

            for (int currSource = 0; currSource < numEmployees; currSource++)
            {
                graph.Add(new List<int>());

                var currInput = Console.ReadLine();
                for (int currEmployee = 0; currEmployee < currInput.Length; currEmployee++)
                {
                    if (currInput[currEmployee] == 'Y')
                    {
                        graph[currSource].Add(currEmployee);
                    }
                }
            }
        }
    }
}
