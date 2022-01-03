using System;
using System.Linq;
using System.Collections.Generic;

namespace _02Dividing_Presents
{
    class Program
    {
        static void Main(string[] args)
        {
            var presents = Console.ReadLine()
                          .Split(' ')
                          .Select(int.Parse)
                          .ToArray();

            var sums = GetSums(presents);

            var totalScore = presents.Sum();
            var bobScore = GetBobScore(totalScore, sums);
            var alanScore = totalScore - bobScore;

            var result = GetPresents(alanScore, sums);
            Print(bobScore, alanScore, result);
        }

        private static void Print(int bobScore, int alanScore, List<int> result)
        {
            var difference = bobScore - alanScore;
            Console.WriteLine($"Difference: {difference}");
            Console.WriteLine($"Alan: {alanScore}");
            Console.WriteLine($"Bob: {bobScore}");
            Console.WriteLine($"Alan takes: {string.Join(' ', result)}");
            Console.WriteLine("Bob takes the rest.");
        }

        private static List<int> GetPresents(int score, Dictionary<int, int> sums)
        {
            var result = new List<int>();

            while (score != 0)
            {
                var currPresent = sums[score];
                result.Add(currPresent);

                score -= currPresent;
            }

            return result;
        }
        private static int GetBobScore(int totalScore, Dictionary<int, int> sums)
        {
            var score = (int)Math.Ceiling(totalScore / 2.0);

            while (!sums.ContainsKey(score))
            {
                score += 1;
            }

            return score;
        }
        private static Dictionary<int, int> GetSums(int[] numbers)
        {
            var result = new Dictionary<int, int>() { { 0, 0 } };

            foreach (var number in numbers)
            {
                var sums = result.Keys.ToArray();
                foreach (var sum in sums)
                {
                    var newSum = number + sum;

                    if (!result.ContainsKey(newSum))
                {
                        result[newSum] = number;
                    }
                }
            }

            return result;
        }
    }
}
