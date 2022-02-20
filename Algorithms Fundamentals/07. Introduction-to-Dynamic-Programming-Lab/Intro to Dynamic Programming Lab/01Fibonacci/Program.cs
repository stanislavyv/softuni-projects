using System;
using System.Collections.Generic;

namespace _01Fibonacci
{
    class Program
    {
        static Dictionary<int, long> memo;

        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            memo = new Dictionary<int, long>();

            Console.WriteLine(Fib(n));
        }

        private static long Fib(int n)
        {
            if (n == 0)
            {
                return 0;
            }

            if (n == 1)
            {
                return 1;
            }

            if (memo.ContainsKey(n))
            {
                return memo[n];
            }

            var result = Fib(n - 1) + Fib(n - 2);
            memo[n] = result;
            return result;
        }
    }
}
