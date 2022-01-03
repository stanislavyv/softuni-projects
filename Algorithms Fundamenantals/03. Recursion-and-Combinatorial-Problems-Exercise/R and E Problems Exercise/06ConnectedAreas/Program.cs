using System;
using System.Collections.Generic;

namespace _06ConnectedAreas
{
    class Program
    {
        static int currSize = 0;

        static void Main(string[] args)
        {
            var rows = int.Parse(Console.ReadLine());
            var cols = int.Parse(Console.ReadLine());

            var matrix = new char[rows, cols];
            FillMatrix(rows, cols, matrix);

            var areas = new SortedSet<Area>();
            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    if (matrix[r, c] == '-')
                    {
                        currSize = 0;
                        var area = new Area(r, c);
                        FindArea(matrix, r, c);
                        area.Size = currSize;

                        areas.Add(area);
                    }
                }
            }

            Print(areas);
        }

        private static void Print(SortedSet<Area> areas)
        {
            Console.WriteLine($"Total areas found: {areas.Count}");
            int cnt = 1;
            foreach (var area in areas)
            {
                Console.WriteLine($"Area #{cnt++} at ({area.Row}, {area.Col}), size: {area.Size}");
            }
        }

        private static void FindArea(char[,] matrix, int currRow, int currCol)
        {
            if (IsInMatrix(matrix, currRow, currCol))
            {
                var currEl = matrix[currRow, currCol];

                if (currEl != '*' && currEl != 'V')
                {
                    matrix[currRow, currCol] = 'V';
                    currSize++;

                    FindArea(matrix, currRow, currCol + 1);
                    FindArea(matrix, currRow + 1, currCol);
                    FindArea(matrix, currRow, currCol - 1);
                    FindArea(matrix, currRow - 1, currCol);
                }

            }
        }
        private static bool IsInMatrix(char[,] matrix, int currRow, int currCol)
        {
            return currRow < matrix.GetLength(0) &&
                            currCol < matrix.GetLength(1) &&
                            currRow >= 0 && currCol >= 0;
        }

        private static void FillMatrix(int rows, int cols, char[,] matrix)
        {
            for (int r = 0; r < rows; r++)
            {
                var currLine = Console.ReadLine().ToCharArray();

                for (int c = 0; c < cols; c++)
                {
                    matrix[r, c] = currLine[c];
                }
            }
        }
    }
}
