using System;
using System.Text;

namespace _06Connecting_Cables
{
    class Program
    {
        static void Main(string[] args)
        {
            var first = Console.ReadLine().Split(' ');
            var second = InitSecond(first);

            var table = new int[first.Length + 1, second.Length + 1];
            FillTable(table, first, second);

            var result = table[first.Length, second.Length];
            Console.WriteLine($"Maximum pairs connected: {result}");
        }

        private static string[] InitSecond(string[] first)
        {
            var second = new string[first.Length];

            for (int i = 1; i <= first.Length; i++)
            {
                second[i - 1] = i.ToString();
            }

            return second;
        }
        private static void FillTable(int[,] table, string[] first, string[] second)
        {
            for (int r = 1; r < table.GetLength(0); r++)
            {
                for (int c = 1; c < table.GetLength(1); c++)
                {
                    if (first[r - 1] == second[c - 1])
                    {
                        table[r, c] = 1 + table[r - 1, c - 1];
                    }
                    else
                    {
                        table[r, c] = Math.Max(table[r - 1, c], table[r, c - 1]);
                    }
                }
            }
        }
    }
}
