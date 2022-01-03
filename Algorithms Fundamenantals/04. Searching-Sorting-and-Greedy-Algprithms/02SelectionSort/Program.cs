using System;
using System.Linq;

namespace _02SelectionSort
{
    class Program
    {
        static void Main(string[] args)
        {
            var elements = Console.ReadLine()
                          .Split(' ')
                          .Select(int.Parse)
                          .ToArray();

            Sort(elements);
            Console.WriteLine(string.Join(' ', elements));
        }

        private static void Sort(int[] arr)
        {
            for (int i = 0; i < arr.Length; i++)
            {
                var min = i;

                for (int j = i + 1; j < arr.Length; j++)
                {
                    if (arr[j] < arr[min]) { min = j; }
                }

                Swap(arr, i, min);
            }
        }
        private static void Swap(int[] arr, int first, int second)
        {
            var temp = arr[first];
            arr[first] = arr[second];
            arr[second] = temp;
        }
    }
}
