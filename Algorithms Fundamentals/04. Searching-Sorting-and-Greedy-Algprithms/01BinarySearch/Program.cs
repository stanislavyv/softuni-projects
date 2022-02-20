using System;
using System.Collections.Generic;
using System.Linq;

namespace _01BinarySearch
{
    class Program
    {
        static void Main(string[] args)
        {
            var arr = Console.ReadLine()
                     .Split(' ')
                     .Select(int.Parse)
                     .ToArray();

            var toLookFor = int.Parse(Console.ReadLine());

            var index = BinarySearch(arr, 0, arr.Count(), toLookFor);
            Console.WriteLine(index);
        }

        private static int BinarySearch(int[] arr, int start, int end, int toLookFor)
        {
            if (start > end) { return -1; }

            var mid = (start + end) / 2;
            var curr = arr[mid];

            if (curr > toLookFor)
            {
                return BinarySearch(arr, start, mid - 1, toLookFor);
            }
            else if (curr < toLookFor)
            {
                return BinarySearch(arr, mid + 1, end, toLookFor);
            }

            return mid;
        }
    }
}
