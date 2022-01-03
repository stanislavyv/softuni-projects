using System;
using System.Collections.Generic;
using System.Linq;

namespace _04RodCutting
{
    class Program
    {
        static int[] prices;
        static int[] bestPrices;
        static int[] prev;

        static void Main(string[] args)
        {
            prices = Console.ReadLine()
                        .Split(' ')
                        .Select(int.Parse)
                        .ToArray();
            var length = int.Parse(Console.ReadLine());

            bestPrices = new int[length + 1];
            prev = new int[length + 1];

            var maxProfit = CutRod(length);
            Console.WriteLine(maxProfit);
            ReconstructSolution(length);
        }
        private static int CutRod(int length)
        {
            if (length == 0)
            {
                return 0;
            }
            if (bestPrices[length] != 0)
            {
                return bestPrices[length];
            }
            var currBest = bestPrices[length];
            for (int i = 1; i <= length; i++)
            {
                currBest = Math.Max(currBest, prices[i] + CutRod(length - i));

                if (currBest > bestPrices[length])
                {
                    bestPrices[length] = currBest;
                    prev[length] = i;
                }
            }
            return bestPrices[length];
        }
        private static void ReconstructSolution(int length)
        {
            var result = new List<int>();
            while (length - prev[length] != 0)
            {
                result.Add(prev[length]);
                length = length - prev[length];
            }

            result.Add(prev[length]);
            Console.WriteLine(string.Join(' ', result));
        }
    }
}
