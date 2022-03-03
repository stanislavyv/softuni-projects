using System;
using System.Collections.Generic;
using System.Linq;

namespace _01RecursiveArraySum
{
    class Program
    {
        static void Main(string[] args)
        {
            var inputArr = Console.ReadLine()
                          .Split(' ')
                          .Select(int.Parse)
                          .ToArray();

            Console.WriteLine(GetSumRecursive(inputArr, 0));
        }

        private static int GetSumRecursive(int[] numbers, int index)
        {
            if (index == numbers.Length)
            {
                return 0;
            }

            return numbers[index] + GetSumRecursive(numbers, index + 1);
        }
    }
}
