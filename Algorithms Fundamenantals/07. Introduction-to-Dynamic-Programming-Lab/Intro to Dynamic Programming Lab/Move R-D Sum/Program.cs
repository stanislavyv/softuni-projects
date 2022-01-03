using System;
using System.Collections.Generic;
using System.Linq;

namespace _04_Move_D_R_Sum
{
    class Program
    {
        static void Main(string[] args)
        {
            var rows = int.Parse(Console.ReadLine());
            var cols = int.Parse(Console.ReadLine());

            var table = InitMatrix(rows, cols);
            var sums = new int[rows, cols];
            Solve(rows, cols, table, sums);

            // Path reconstruction
            Stack<string> result = ExtractPath(rows, cols, table, sums);

            Console.WriteLine(string.Join(' ', result));
        }

        private static Stack<string> ExtractPath(int rows, int cols, int[,] table, int[,] sums)
        {
            var result = new Stack<string>();

            var currRow = rows - 1;
            var currCol = cols - 1;
            while (currRow > 0 && currCol > 0)
            {
                var currSum = sums[currRow, currCol];
                result.Push($"[{currRow}, {currCol}]");

                if (currSum - sums[currRow, currCol - 1] ==
                    table[currRow, currCol])
                {
                    currCol--;
                }
                else
                {
                    currRow--;
                }
            }

            if (currRow == 0)
            {
                for (int i = currCol; i >= 0; i--)
                {
                    result.Push($"[{currRow}, {i}]");
                }
            }
            else if (currCol == 0)
            {
                for (int j = currRow; j >= 0; j--)
                {
                    result.Push($"[{j}, {currCol}]");
                }
            }

            return result;
        }

        private static void Solve(int rows, int cols, int[,] table, int[,] sums)
        {
            // Solution for matrix with one el
            sums[0, 0] = table[0, 0];
            // Solution for matrix with one col
            for (int r = 1; r < rows; r++)
            {
                sums[r, 0] = sums[r - 1, 0] + table[r, 0];
            }
            // Solution for matrix with one row
            for (int c = 1; c < cols; c++)
            {
                sums[0, c] = sums[0, c - 1] + table[0, c];
            }
            // Solution for [n,m] matrix
            for (int row = 1; row < rows; row++)
            {
                for (int col = 1; col < cols; col++)
                {
                    var currMax = Math.Max(sums[row - 1, col], sums[row, col - 1]);
                    sums[row, col] = table[row, col] + currMax;
                }
            }
        }

        private static int[,] InitMatrix(int rows, int cols)
        {
            var matrix = new int[rows, cols];
            for (int r = 0; r < rows; r++)
            {
                var currCol = Console.ReadLine()
                             .Split(' ')
                             .Select(int.Parse)
                             .ToArray();

                for (int c = 0; c < cols; c++)
                {
                    matrix[r, c] = currCol[c];
                }
            }

            return matrix;
        }
    }
}
