using System;

namespace _01PermutationsWithoutRepetitions
{
    class Program
    {
        //static bool[] used;

        static void Main(string[] args)
        {
            var set = Console.ReadLine().Split(' ');

            Permute(set, 0);
        }


        // Non-optimal solution:
        //static void Permute(string[] set, int index)
        //{
        //    if (index == set.Length)
        //    {
        //        Print(permutations);
        //    }
        //    else {
        //        for (int i = 0; i < set.Length; i++)
        //        {
        //            if (!used[i])
        //            {
        //                used[i] = true;
        //                permutations[index] = set[i];
        //                Permute(set, index + 1);
        //                used[i] = false;
        //            }
        //        }
        //    }
        //}
        static void Permute(string[] set, int index)
        {
            if (index == set.Length)
            {
                Print(set);
            }
            else
            {
                // This is for printing purposes:
                // index will become equal to set.Length
                // and therefore i will be equal to the 
                // length -> it won't enter the loop
                Permute(set, index + 1);
                for (int i = index + 1; i < set.Length; i++)
                {
                    Swap(set, index, i);
                    Permute(set, index + 1);
                    Swap(set, index, i);
                }
            }
        }

        static void Swap(string[] arr, int first, int second)
        {
            var temp = arr[first];
            arr[first] = arr[second];
            arr[second] = temp;
        }

        static void Print(string[] arr)
        {
            Console.WriteLine(string.Join(' ', arr));
        }
    }
}
