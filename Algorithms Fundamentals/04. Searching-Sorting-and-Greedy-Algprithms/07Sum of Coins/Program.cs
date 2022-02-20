using System;
using System.Collections.Generic;
using System.Linq;

namespace _07Sum_of_Coins
{
    class Program
    {
        static void Main(string[] args)
        {
            var coins = Console.ReadLine()
                       .Split(", ")
                       .Select(int.Parse)
                       .OrderBy(a => a)
                       .ToArray();

            var targetSum = int.Parse(Console.ReadLine());

            // key - coin value, value - number of times used
            var numberOfCoins = new Dictionary<int, int>();

            var isCompleted = false;
            var actualSum = 0;
            for (int i = coins.Count() - 1; i >= 0; i--)
            {
                var currCoin = coins[i];
                while (actualSum + currCoin <= targetSum)
                {
                    if (!numberOfCoins.ContainsKey(currCoin)) { numberOfCoins[currCoin] = 0; }
                    numberOfCoins[currCoin]++;
                    actualSum += currCoin;
                }

                if (actualSum == targetSum)
                {
                    isCompleted = true;
                    break;
                }
            }

            if (isCompleted)
            {
                Console.WriteLine($"Number of coins to take: {numberOfCoins.Values.Sum()}");
                foreach (var kvp in numberOfCoins)
                {
                    var coin = kvp.Key;
                    var number = kvp.Value;

                    Console.WriteLine($"{number} coin(s) with value {coin}");
                }
            }
            else
            {
                Console.WriteLine("Error");
            }
        }
    }
}
