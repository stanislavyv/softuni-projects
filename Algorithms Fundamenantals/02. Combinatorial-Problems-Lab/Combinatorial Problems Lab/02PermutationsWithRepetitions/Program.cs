using System;
using System.Collections.Generic;

namespace _02PermutationsWithRepetitions
{
    class Program
    {
        static HashSet<string> swapped;

        static void Main(string[] args)
        {
            var set = Console.ReadLine().Split(' ');

            Permute(set, 0);
        }

        private static void Permute(string[] set, int index)
        {
            if (index == set.Length)
            {
                Print(set);
                return;
            }

            Permute(set, index + 1);
            swapped = new HashSet<string>() { set[index] };
            //swapped.Add(set[index]);
            for (int i = index + 1; i < set.Length; i++)
            {
                if (!swapped.Contains(set[i]))
                {
                    Swap(set, index, i);
                    Permute(set, index + 1);
                    Swap(set, index, i);

                    swapped.Add(set[i]);
                }
            }
        }
        private static void Swap(string[] arr, int first, int second)
        {
            var temp = arr[first];
            arr[first] = arr[second];
            arr[second] = temp;
        }
        private static void Print(string[] arr)
        {
            Console.WriteLine(string.Join(' ', arr));
        }
    }
}
