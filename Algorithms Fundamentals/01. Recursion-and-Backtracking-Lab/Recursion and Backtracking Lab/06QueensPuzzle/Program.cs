using System;
using System.Diagnostics;

namespace _06QueensPuzzle
{
    class Program
    {
        static char[,] board = new char[,]
            {
                { '-', '-', '-', '-', '-', '-', '-', '-' },
                { '-', '-', '-', '-', '-', '-', '-', '-' },
                { '-', '-', '-', '-', '-', '-', '-', '-' },
                { '-', '-', '-', '-', '-', '-', '-', '-' },
                { '-', '-', '-', '-', '-', '-', '-', '-' },
                { '-', '-', '-', '-', '-', '-', '-', '-' },
                { '-', '-', '-', '-', '-', '-', '-', '-' },
                { '-', '-', '-', '-', '-', '-', '-', '-' }
            };

        static void Main(string[] args)
        {
            Solve(0);
        }

        private static void Solve(int row)
        {
            if (row == 8)
            {
                PrintBoard();
            }
            else
            {
                for (int col = 0; col < 8; col++)
                {
                    if (CanPlaceQueen(row, col))
                    {
                        board[row, col] = '*';
                        Solve(row + 1);
                        board[row, col] = '-';
                    }
                }
            }
        }
        private static bool CanPlaceQueen(int row, int col)
        {
            return CanGoVertical(row, col) &&
                   CanGoHorizontal(row, col) &&
                   CanGoDiagonal(row, col);
        }

        private static bool CanGoVertical(int row, int col)
        {
            var rows = board.GetLength(0);
            if (row < 0 || row == rows) { return false; }

            for (int r = 0; r < rows; r++)
            {
                if (board[r, col] == '*') { return false; }
            }

            return true;
        }
        private static bool CanGoHorizontal(int row, int col)
        {
            var cols = board.GetLength(1);
            if (col < 0 || col == cols) { return false; }

            for (int c = 0; c < cols; c++)
            {
                if (board[row, c] == '*') { return false; }
            }

            return true;
        }
        private static bool CanGoDiagonal(int row, int col)
        {
            return CanGoPrimaryDiagonal(row, col) &&
                   CanGoSecondaryDiagonal(row, col);
        }
        private static bool CanGoSecondaryDiagonal(int row, int col)
        {
            if (!IsInBounds(row, col)) { return false; }

            int r = row, c = col;
            while (IsInBounds(r, c))
            {
                if (board[r--, c++] == '*')
                {
                    return false;
                }
            }

            r = row; c = col;
            while (IsInBounds(r, c))
            {
                if (board[r++, c--] == '*')
                {
                    return false;
                }
            }

            return true;
        }
        private static bool CanGoPrimaryDiagonal(int row, int col)
        {
            if (!IsInBounds(row, col)) { return false; }

            int r = row, c = col;
            while (IsInBounds(r, c))
            {
                if (board[r--, c--] == '*')
                {
                    return false;
                }
            }

            r = row; c = col;
            while (IsInBounds(r, c))
            {
                if (board[r++, c++] == '*')
                {
                    return false;
                }
            }

            return true;
        }
        private static bool IsInBounds(int r, int c)
        {
            var rows = board.GetLength(0);
            var cols = board.GetLength(1);

            return r >= 0 && r < rows &&
                c >= 0 && c < cols;
        }
        private static void PrintBoard()
        {
            for (int r = 0; r < board.GetLength(0); r++)
            {
                for (int c = 0; c < board.GetLength(1); c++)
                {
                    Console.Write(board[r, c] + " ");
                }

                Console.WriteLine();
            }

            Console.WriteLine();
        }
    }
}
