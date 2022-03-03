using System;

namespace _03VariationsWithoutRepetitions
{
    class Program
    {
        static string[] variations;
        static bool[] used;

        static void Main(string[] args)
        {
            var set = Console.ReadLine().Split(' ');
            var k = int.Parse(Console.ReadLine());

            variations = new string[k];
            used = new bool[set.Length];

            GetVariations(set, 0);
        }

        private static void GetVariations(string[] set, int index)
        {
            // The only difference between this
            // solution and the permutations on
            // is that we print when the index
            // becomes equal to var.Length (k)
            if (index == variations.Length)
            {
                Print(variations);
            }
            else
            {
                for (int i = 0; i < set.Length; i++)
                {
                    if (!used[i])
                    {
                        used[i] = true;
                        variations[index] = set[i];
                        GetVariations(set, index + 1);
                        used[i] = false;
                    }
                }
            }
        }

        // It does its work but I'm sure it can be even more optimized
        //private static void GetVariations(string[] set, int index, int k)
        //{
        //    if (index == k)
        //    {
        //        Print(set, k);
        //    }
        //    else
        //    {
        //        GetVariations(set, index + 1, k);
        //        for (int i = index + 1; i < set.Length; i++)
        //        {
        //            Swap(set, index, i);
        //            GetVariations(set, index + 1, k);
        //            Swap(set, index, i);
        //        }
        //    }
        //}

        static void Swap(string[] arr, int first, int second)
        {
            var temp = arr[first];
            arr[first] = arr[second];
            arr[second] = temp;
        }

        static void Print(string[] arr)
        {
            Console.WriteLine(string.Join(' ', arr));

            // Swapping method
            //if (k > arr.Length)
            //{
            //    throw new InvalidOperationException("k must be lower than or equal to n!!");
            //}

            //for (int i = 0; i < k; i++)
            //{
            //    Console.Write(arr[i]);
            //}

            //Console.WriteLine();
        }
    }
}
