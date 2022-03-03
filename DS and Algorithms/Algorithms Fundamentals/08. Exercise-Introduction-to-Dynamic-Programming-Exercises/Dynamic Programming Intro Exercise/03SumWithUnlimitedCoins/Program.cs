using System;
using System.Collections.Generic;
using System.Linq;

namespace _03Sum_With_Unlimited_Coins
{
    class Program
    {
        static void Main(string[] args)
        {
            var coins = Console.ReadLine()
                       .Split(' ')
                       .Select(int.Parse)
                       .ToArray();

            var target = int.Parse(Console.ReadLine());

            var sums = CalcSums(coins, target);
            Console.WriteLine(sums[target]);
        }

        private static Dictionary<int, int> CalcSums(int[] coins, int target)
        {
            var sums = new Dictionary<int, int>() { { 0, 1 } };

            foreach (var coin in coins)
            {
                for (int currSum = coin; currSum <= target; currSum++)
                {
                    // Number of ways to accomplish currSum
                    var cnt = 0;

                    if (sums.ContainsKey(currSum))
                    {
                        cnt = sums[currSum - coin] + sums[currSum];
                    }
                    else
                    {
                        cnt = 1;
                    }

                    sums[currSum] = cnt;
                }
            }

            return sums;
        }
    }
}
