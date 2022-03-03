using System;

namespace _05Combinations_Without_Repetition
{
    class Program
    {
        static int[] combinations;

        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            var k = int.Parse(Console.ReadLine());
            combinations = new int[k];

            GetCombinations(n, k, 0, 1);
        }

        private static void GetCombinations(int n, int k, int index, int start)
        {
            if (index == k)
            {
                Print();
            }
            else
            {
                for (int i = start; i <= n; i++)
                {
                    combinations[index] = i;
                    GetCombinations(n, k, index + 1, i + 1);
                }
            }
        }

        private static void Print()
        {
            Console.WriteLine(string.Join(' ', combinations));
        }
    }
}
