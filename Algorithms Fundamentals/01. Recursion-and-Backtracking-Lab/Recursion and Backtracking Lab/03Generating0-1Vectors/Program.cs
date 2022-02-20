using System;

namespace _03Generating0_1Vectors
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            var vector = new int[n];
            GenerateVector(vector, 0);
        }

        private static void GenerateVector(int[] vector, int index)
        {
            for (int i = 0; i <= 1; i++)
            {
                if (IsInBounds(vector, index))
                {
                    vector[index] = i;
                    Console.WriteLine(string.Join("", vector));
                    GenerateVector(vector, index + 1);
                }
            }
        }

        private static bool IsInBounds(int[] arr, int index)
        {
            return index >= 0 && index < arr.Length;
        }
    }
}
