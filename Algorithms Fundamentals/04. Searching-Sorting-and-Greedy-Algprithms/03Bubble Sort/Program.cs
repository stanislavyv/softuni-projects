using System;
using System.Linq;

namespace _03Bubble_Sort
{
    class Program
    {
        static void Main(string[] args)
        {
            var elements = Console.ReadLine()
                          .Split(' ')
                          .Select(int.Parse)
                          .ToArray();

            BubbleSort(elements);
            Console.WriteLine(string.Join(' ', elements));
        }

        private static void BubbleSort(int[] arr)
        {
            var n = arr.Length;
            for (int i = 0; i < n - 1; i++)
            {
                var swapped = false;
                for (int j = 0; j < n - i - 1; j++)
                {
                    if (arr[j] > arr[j + 1])
                    {
                        Swap(arr, j, j + 1);
                        swapped = true;
                    }
                }

                if (!swapped) { break; }
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
