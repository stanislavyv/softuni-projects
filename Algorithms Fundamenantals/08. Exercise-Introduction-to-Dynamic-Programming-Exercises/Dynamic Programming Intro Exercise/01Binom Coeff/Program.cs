using System;
using System.Collections.Generic;

namespace _01Binom_Coeff
{
    class Program
    {
        static Dictionary<string, long> memo;

        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            var k = int.Parse(Console.ReadLine());

            memo = new Dictionary<string, long>();
            var result = GetCoeff(n, k);

            Console.WriteLine(result);
        }

        private static long GetCoeff(int n, int k)
        {
            var key = $"{n} {k}";
            if (memo.ContainsKey(key)) { return memo[key]; }

            if (k == 0 || k == n)
            {
                return 1;
            }

            var result = GetCoeff(n - 1, k) + GetCoeff(n - 1, k - 1);
            memo[key] = result;

            return result;
        }
    }
}
