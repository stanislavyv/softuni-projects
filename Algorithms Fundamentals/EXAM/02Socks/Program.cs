using System;

namespace _02Socks
{
    class Program
    {
        static void Main(string[] args)
        {
            var first = Console.ReadLine().Split();
            var second = Console.ReadLine().Split();

            var lcsMatrix = InitMatrix(first, second);

            FillMatrix(lcsMatrix, first, second);
            Console.WriteLine(lcsMatrix[lcsMatrix.GetLength(0) - 1, lcsMatrix.GetLength(1) - 1]);
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

        private static int[,] InitMatrix(string[] first, string[] second)
        {
            var lcsMatrix = new int[first.Length + 1, second.Length + 1];

            for (int r = 0; r < first.Length; r++)
            {
                lcsMatrix[r, 0] = 0;
            }

            for (int c = 0; c < second.Length; c++)
            {
                lcsMatrix[0, c] = 0;
            }

            return lcsMatrix;
        }
    }
}
