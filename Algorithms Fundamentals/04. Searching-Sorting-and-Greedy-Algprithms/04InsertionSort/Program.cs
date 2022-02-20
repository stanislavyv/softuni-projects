using System;
using System.Linq;

namespace InsertionSort
{
    class Program
    {
        static void Main(string[] args)
        {
            var elements = Console.ReadLine()
                          .Split(' ')
                          .Select(int.Parse)
                          .ToArray();

            InsertionSort(elements);
            Console.WriteLine(string.Join(' ', elements));
        }

        private static void InsertionSort(int[] arr)
        {
            for (int i = 1; i < arr.Length; i++)
            {
                var curr = arr[i];

                var j = i - 1;
                while (j >= 0 && arr[j] > curr)
                {
                    arr[j + 1] = arr[j];
                    j--;
                }

                arr[j + 1] = curr;
            }
        } 
    }
}
