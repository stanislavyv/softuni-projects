using System;
using System.Text;

namespace _02RecursiveDrawing
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());

            var sb = new StringBuilder();
            DrawStars(n, n);
            DrawHashes(1, n);
        }

        private static void DrawStars(int cnt, int n)
        {
            if (cnt == 0) { return; }

            var curr = new string('*', cnt);
            Console.WriteLine(curr);

            DrawStars(cnt - 1, n);
        }

        private static void DrawHashes(int cnt, int n)
        {
            if (cnt > n) { return; }

            var curr = new string('#', cnt);
            Console.WriteLine(curr);

            DrawHashes(cnt + 1, n);
        }
    }
}
