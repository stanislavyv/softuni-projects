using System;
using System.Collections.Generic;

namespace _02Time_Problem
{
    class Program
    {
        static void Main(string[] args)
        {
            var first = Console.ReadLine().Split();
            var second = Console.ReadLine().Split();

            var lcsMatrix = InitMatrix(first.Length, second.Length);
            FillMatrix(lcsMatrix, first, second);

            var result = RebuildPath(lcsMatrix, first, second);
            Console.WriteLine(string.Join(' ', result));
            Console.WriteLine(result.Count);
        }

        private static Stack<string> RebuildPath(int[,] lcsMatrix, string[] first, string[] second)
        {
            var result = new Stack<string>();

            var row = lcsMatrix.GetLength(0) - 1;
            var col = lcsMatrix.GetLength(1) - 1;

            while (row >= 1 && col >= 1)
            {
                if (first[row - 1] == second[col - 1])
                {
                    result.Push(first[row - 1]);
                    row--;
                    col--;
                }
                else
                {
                    if (lcsMatrix[row - 1, col] > lcsMatrix[row, col - 1])
                    {
                        row--;
                    }
                    else
                    {
                        col--;
                    }
                }
            }

            return result;
        }

        private static void FillMatrix(int[,] lcsMatrix, string[] first, string[] second)
        {
            for (int r = 1; r < lcsMatrix.GetLength(0); r++)
            {
                for (int c = 1; c < lcsMatrix.GetLength(1); c++)
                {
                    if (first[r - 1] == second[c - 1])
                    {
                        lcsMatrix[r, c] = 1 + lcsMatrix[r - 1, c - 1];
                    }
                    else
                    {
                        lcsMatrix[r, c] = Math.Max(lcsMatrix[r - 1, c], lcsMatrix[r, c - 1]);
                    }
                }
            }
        }
        private static int[,] InitMatrix(int firstLength, int secondLength)
        {
            var result = new int[firstLength + 1, secondLength + 1];

            for (int r = 0; r < firstLength; r++)
            {
                result[r, 0] = 0;
            }

            for (int c = 0; c < secondLength; c++)
            {
                result[0, c] = 0;
            }

            return result;
        }
    }
}
