using System;

namespace _04RecursiveFactorial
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());

            var sum = RecursiveFactorial(n);
            Console.WriteLine(sum);
        }

        private static int RecursiveFactorial(int n)
        {
            if (n < 1) { return 0; }
            if (n == 1) { return 1; }

            return n * RecursiveFactorial(n - 1);
        }
    }
}
