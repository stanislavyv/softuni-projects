using System;
using System.Collections.Generic;
using System.Linq;

namespace _02Areas_in_Matrix
{
    class Program
    {
        static char[,] matrix;
        static bool[,] visited;
        static Dictionary<char, int> areas;

        static void Main(string[] args)
        {
            var rows = int.Parse(Console.ReadLine());
            var cols = int.Parse(Console.ReadLine());

            matrix = InitMatrix(rows, cols);
            visited = new bool[rows, cols];
            areas = new Dictionary<char, int>();

            Solve(rows, cols);
            Print();
        }

        private static void Print()
        {
            var sortedAreas = areas.OrderBy(kvp => kvp.Key);

            Console.WriteLine($"Areas: {areas.Values.Sum()}");
            foreach (var kvp in sortedAreas)
            {
                var letter = kvp.Key;
                var numAreas = kvp.Value;

                Console.WriteLine($"Letter '{letter}' -> {numAreas}");
            }
        }
        private static void Solve(int rows, int cols)
        {
            for (int row = 0; row < rows; row++)
            {
                for (int col = 0; col < cols; col++)
                {
                    if (!visited[row, col])
                    {
                        DFS(row, col);
                        var currLetter = matrix[row, col];

                        if (!areas.ContainsKey(currLetter))
                        {
                            areas[currLetter] = 1;
                        }
                        else
                        {
                            areas[currLetter]++;
                        }
                    }
                }
            }
        }
        private static void DFS(int row, int col)
        {
            if (visited[row, col]) { return; }
            visited[row, col] = true;

            var children = GetChildren(row, col);

            foreach (var child in children)
            {
                DFS(child.Row, child.Col);
            }
        }
        private static List<Node> GetChildren(int row, int col)
        {
            var children = new List<Node>();

            if (IsValidChild(row, col, row - 1, col))
            {
                var node = new Node(row - 1, col);
                children.Add(node);
            }

            if (IsValidChild(row, col, row, col + 1))
            {
                var node = new Node(row, col + 1);
                children.Add(node);
            }

            if (IsValidChild(row, col, row + 1, col))
            {
                var node = new Node(row + 1, col);
                children.Add(node);
            }

            if (IsValidChild(row, col, row, col - 1))
            {
                var node = new Node(row, col - 1);
                children.Add(node);
            }

            return children;
        }
        private static bool IsValidChild(int row, int col, int childRow, int childCol)
        {
            return IsInside(childRow, childCol) &&
                   IsSameLetter(row, col, childRow, childCol) &&
                   !visited[childRow, childCol];
        }
        private static bool IsSameLetter(int row, int col, int childRow, int childCol)
        {
            return matrix[row, col] == matrix[childRow, childCol];
        }
        private static bool IsInside(int row, int col)
        {
            return row >= 0 &&
                   row < matrix.GetLength(0) &&
                   col >= 0 &&
                   col < matrix.GetLength(1);
        }
        private static char[,] InitMatrix(int rows, int cols)
        {
            var matrix = new char[rows, cols];

            for (int row = 0; row < rows; row++)
            {
                var currCol = Console.ReadLine();
                for (int col = 0; col < cols; col++)
                {
                    matrix[row, col] = currCol[col];
                }
            }

            return matrix;
        }
    }
}
