using System;

namespace _06CombinationsWithRepetition
{
    class Program
    {
        static string[] combinations;

        static void Main(string[] args)
        {
            var set = Console.ReadLine().Split(' ');
            var k = int.Parse(Console.ReadLine());

            combinations = new string[k];

            GetCombinations(set, 0, 0);
        }

        private static void GetCombinations(string[] set, int index, int start)
        {
            if (index == combinations.Length)
            {
                Print(combinations);
            }
            else
            {
                for (int i = start; i < set.Length; i++)
                {
                    combinations[index] = set[i];
                    GetCombinations(set, index + 1, i);
                }
            }
        }

        static void Print(string[] arr)
        {
            Console.WriteLine(string.Join(' ', arr));
        }
    }
}
