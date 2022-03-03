using System;

namespace TBC
{
    class Program
    {
        static void Main(string[] args)
        {
            int rows = int.Parse(Console.ReadLine());
            int cols = int.Parse(Console.ReadLine());

            var matrix = ReadMatrix(rows, cols);
            var visited = new bool[rows, cols];

            int tunnels = GetAllTunnels(matrix, visited);

            Console.WriteLine(tunnels);
        }

        private static int GetAllTunnels(char[,] matrix, bool[,] visited)
        {
            int result = 0;

            for (int r = 0; r < matrix.GetLength(0); r++)
            {
                for (int c = 0; c < matrix.GetLength(1); c++)
                {
                    if (!visited[r, c] && matrix[r, c] == 't')
                    {
                        DFS(matrix, r, c, visited);
                        result++;
                    }
                }
            }

            return result;
        }

        private static void DFS(char[,] matrix, int r, int c, bool[,] visited)
        {
            if (!IsInside(matrix, r, c) ||
                visited[r,c] ||
                matrix[r,c] == 'd')
            {
                return;
            }

            visited[r, c] = true;

            DFS(matrix, r + 1, c, visited);
            DFS(matrix, r + 1, c + 1, visited);
            DFS(matrix, r, c + 1, visited);
            DFS(matrix, r - 1, c + 1, visited);
            DFS(matrix, r - 1, c, visited);
            DFS(matrix, r, c - 1,visited);
            DFS(matrix, r - 1, c - 1, visited);
            DFS(matrix, r + 1, c - 1, visited);
        }

        private static bool IsSafe(char[,] matrix, int r, int c)
        {
            returIsInside 0 && r < matrix.GetLength(0) &&
                   c >= 0 && c < matrix.GetLength(1);
        }

        private static char[,] ReadMatrix(int rows, int cols)
        {
            var result = new char[rows, cols];

            for (int r = 0; r < rows; r++)
            {
                var line = Console.ReadLine();

                for (int c = 0; c < cols; c++)
                {
                    result[r, c] = line[c];
                }
            }

            return result;
        }
    }
}