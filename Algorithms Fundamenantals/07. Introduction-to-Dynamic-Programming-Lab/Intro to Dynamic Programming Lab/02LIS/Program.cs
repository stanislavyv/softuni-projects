using System;
using System.Collections.Generic;
using System.Linq;

namespace _02LIS
{
    class Program
    {
        static void Main(string[] args)
        {
            var numbers = Console.ReadLine()
                         .Split(' ')
                         .Select(int.Parse)
                         .ToArray();

            var lengths = new int[numbers.Length];
            var prev = new int[numbers.Length];
            Array.Fill(prev, -1);

            var maxLength = 0;
            // the index of element with biggest length
            var bestIndex = -1;

            for (int i = 0; i < numbers.Length; i++)
            {
                var current = numbers[i];
                var bestLength = 1;

                for (int j = i - 1; j >= 0; j--)
                {
                    if (numbers[j] < current &&
                        lengths[j] + 1 > bestLength)
                    {
                        bestLength = lengths[j] + 1;
                        prev[i] = j;
                    }
                }

                lengths[i] = bestLength;

                if (bestLength > maxLength)
                {
                    maxLength = bestLength;
                    bestIndex = i;
                }
            }

            // Sequence reconstruction
            var result = new Stack<int>();
            var currIndex = bestIndex;
            while (currIndex != -1)
            {
                var currNum = numbers[currIndex];
                result.Push(currNum);
                currIndex = prev[currIndex];
            }

            Console.WriteLine(string.Join(' ', result));
        }
    }
}
