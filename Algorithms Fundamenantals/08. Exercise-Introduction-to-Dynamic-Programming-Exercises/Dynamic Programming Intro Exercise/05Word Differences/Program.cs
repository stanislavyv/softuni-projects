using System;

namespace _05Word_Differences
{
    class Program
    {
        static void Main(string[] args)
        {
            var first = Console.ReadLine();
            var second = Console.ReadLine();

            // Base case - empty strings
            var table = InitTable(first, second);
            FillTable(first, second, table);

            var result = table[first.Length, second.Length];
            Console.WriteLine($"Deletions and Insertions: {result}");
        }

        private static void FillTable(string first, string second, int[,] table)
        {
            for (int r = 1; r < table.GetLength(0); r++)
            {
                for (int c = 1; c < table.GetLength(1); c++)
                {
                    if (first[r - 1] == second[c - 1])
                    {
                        table[r, c] = table[r - 1, c - 1];
                    }
                    else
                    {
                        table[r, c] = 1 + Math.Min(table[r - 1, c], table[r, c - 1]);
                    }
                }
            }
        }

        private static int[,] InitTable(string first, string second)
        {
            var table = new int[first.Length + 1, second.Length + 1];

            for (int row = 0; row < table.GetLength(0); row++)
            {
                table[row, 0] = row;
            }

            for (int col = 0; col < table.GetLength(1); col++)
            {
                table[0, col] = col;
            }

            return table;
        }
    }
}
