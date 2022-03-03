using System;
using System.Linq;

namespace _06Merge_Sort
{
    class Program
    {
        static void Main(string[] args)
        {
            var elements = Console.ReadLine()
                          .Split(' ')
                          .Select(int.Parse)
                          .ToArray();

            Console.WriteLine(string.Join(' ', MergeSort(elements)));
        }

        private static int[] MergeSort(int[] arr)
        {
            return Collapse(arr);
        }
        private static int[] Collapse(int[] arr)
        {
            if (arr.Length <= 1) { return arr; }

            var midPoint = arr.Length / 2;

            var left = new int[midPoint];
            int[] right;

            if (arr.Length % 2 == 0) { right = new int[midPoint]; }
            else { right = new int[midPoint + 1]; }

            for (int l = 0; l < midPoint; l++)
            {
                left[l] = arr[l];
            }

            var x = 0;
            for (int r = midPoint; r < arr.Length; r++)
            {
                right[x++] = arr[r];
            }

            left = Collapse(left);
            right = Collapse(right);

            return Merge(arr, left, right);
        }
        private static int[] Merge(int[] arr, int[] left, int[] right)
        {
            var result = new int[left.Length + right.Length];

            // If the rightmost element of left
            // array is smaller than the leftmost
            // element of right array, the array is
            // already sorted;
            if (left[left.Length - 1] < right[0])
            {
                left.CopyTo(result, 0);
                right.CopyTo(result, left.Length);
                return result;
            }

            int leftIndex = 0, rightIndex = 0, resultIndex = 0;

            while (resultIndex < result.Length)
            {
                if (leftIndex < left.Length &&
                    rightIndex < right.Length)
                {
                    if (left[leftIndex] < right[rightIndex])
                    {
                        result[resultIndex++] = left[leftIndex++];
                    }
                    else
                    {
                        result[resultIndex++] = right[rightIndex++];
                    }
                }
                else if (leftIndex < left.Length)
                {
                    result[resultIndex++] = left[leftIndex++];
                }
                else if (rightIndex < right.Length)
                {
                    result[resultIndex++] = right[rightIndex++];
                }
            }

            return result;
        }
    }
}
