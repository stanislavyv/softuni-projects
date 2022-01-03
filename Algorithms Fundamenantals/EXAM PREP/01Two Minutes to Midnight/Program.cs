using System;
using System.Collections.Generic;

namespace _01_Two_Minutes_to_Midnight
{
    class Program
    {
        static Dictionary<string, long> cache;
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            var k = int.Parse(Console.ReadLine());

            cache = new Dictionary<string, long>();
            var result = GetBinom(n, k);
            Console.WriteLine(result);
        }

        private static long GetBinom(int n, int k)
        {
            var id = $"{n} {k}";
            if (k == 0 || k == n)
            {
                return 1;
            }

            if (cache.ContainsKey(id))
            {
                return cache[id];
            }

            var result = GetBinom(n - 1, k) + GetBinom(n - 1, k - 1);
            cache[id] = result;

            return result;
        }
    }
}
