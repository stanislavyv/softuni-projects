using System;
using System.Linq;

namespace _05QuickSort
{
    class Program
    {
        static void Main(string[] args)
        {
            var elements = Console.ReadLine()
                          .Split(' ')
                          .Select(int.Parse)
                          .ToArray();

            QuickSort(elements, 0, elements.Length - 1);
            Console.WriteLine(string.Join(' ', elements));
        }

        private static void QuickSort(int[] arr, int start, int end)
        {
            if (start >= end) { return; }

            var pivot = start;
            var left = start + 1;
            var right = end;

            // Initial phase
            while (left <= right)
            {
                // Making sure that left is smaller
                // than pivot and right is
                // bigger than pivot
                if (arr[left] > arr[pivot] &&
                    arr[right] < arr[pivot])
                {
                    Swap(arr, left, right);
                }

                if (arr[left] <= arr[pivot])
                {
                    left++;
                }

                if (arr[right] >= arr[pivot])
                {
                    right--;
                }
            }

            // Swap pivot with right, which is now lesser 
            // than left - it means that all of the 
            // elements in the left sub-array are smaller 
            // than pivot and all of the elements in the 
            // right sub-array are bigger than pivot
            Swap(arr, pivot, right);

            // Second phase
            var isLeftArrSmaller = right - 1 - start < end - right + 1;

            // We make sure that we always call the fn
            // with the smaller sub-array first, which
            // helps us accomplish log(n) memory usage
            if (isLeftArrSmaller)
            {
                QuickSort(arr, start, right - 1);
                QuickSort(arr, right + 1, end);
            }
            else
            {
                QuickSort(arr, right + 1, end);
                QuickSort(arr, start, right - 1);
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
