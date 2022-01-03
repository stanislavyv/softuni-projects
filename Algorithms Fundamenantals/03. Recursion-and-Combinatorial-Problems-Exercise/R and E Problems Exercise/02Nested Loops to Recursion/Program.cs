using System;

namespace _02Nested_Loops_to_Recursion
{
    class Program
    {
        static void Main(string[] args)
        {
            var limit = int.Parse(Console.ReadLine());
            var permutations = new int[limit];

            Permute(permutations, 0);
        }

        private static void Permute(int[] arr, int index)
        {
            if (index == arr.Length)
            {
                Print(arr);
            }
            else
            {
                for (int i = 1; i <= arr.Length; i++)
                {
                    arr[index] = i;
                    Permute(arr, index + 1);
                }
            }
        } 
        private static void Print(int[] arr)
        {
            foreach (var element in arr)
            {
                Console.Write(element + " ");
            }
            Console.WriteLine();
        }
    }
}
