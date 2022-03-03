using System;
using System.Collections.Generic;
using System.Linq;

namespace _05FindAllPathsInALabyrinth
{
    class Program
    {
        static void Main(string[] args)
        {
            var rows = int.Parse(Console.ReadLine());
            var cols = int.Parse(Console.ReadLine());
            var labyrinth = new char[rows, cols];

            FillLabyrinth(rows, cols, labyrinth);

            var res = new List<char>();

            FindPath(labyrinth, res, 0, 0, ' ');
        }

        private static void FindPath(char[,] labyrinth, List<char> res, int row, int col, char direction)
        {
            if (IsInBounds(row, col, labyrinth))
            {
                var curr = labyrinth[row, col];

                if (curr == 'e')
                {
                    res.Add(direction);
                    PrintRes(res);
                    res.RemoveAt(res.Count - 1);
                }
                else if (curr == '-')
                {
                    labyrinth[row, col] = 'V';
                    res.Add(direction);
                    // Go up
                    FindPath(labyrinth, res, row - 1, col, 'U');
                    // Go down
                    FindPath(labyrinth, res, row + 1, col, 'D');
                    // Go left
                    FindPath(labyrinth, res, row, col - 1, 'L');
                    // Go right
                    FindPath(labyrinth, res, row, col + 1, 'R');

                    // Unmark
                    labyrinth[row, col] = '-';
                    res.RemoveAt(res.Count - 1);
                }
            }
        }
        private static void PrintRes(List<char> res)
        {
            Console.WriteLine(string.Join("", res.Skip(1)));
        }
        private static bool IsInBounds(int row, int col, char[,] matrix)
        {
            return row >= 0 && row < matrix.GetLength(0) &&
                   col >= 0 && col < matrix.GetLength(1);
        }
        private static void FillLabyrinth(int rows, int cols, char[,] labyrinth)
        {
            for (int r = 0; r < rows; r++)
            {
                var col = Console.ReadLine().ToCharArray();

                for (int c = 0; c < cols; c++)
                {
                    labyrinth[r, c] = col[c];
                }
            }
        }
    }
}
