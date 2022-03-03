using System;

namespace _04VariationsWithRepetition
{
    class Program
    {
        static string[] variations;

        static void Main(string[] args)
        {
            var set = Console.ReadLine().Split(' ');
            var k = int.Parse(Console.ReadLine());

            variations = new string[k];

            GetVariations(set, 0);
        }

        private static void GetVariations(string[] set, int index)
        {
            if (index == variations.Length)
            {
                Print(variations);
            }
            else
            {
                for (int i = 0; i < set.Length; i++)
                {
                    variations[index] = set[i];
                    GetVariations(set, index + 1);
                }
            }
        }

        static void Print(string[] arr)
        {
            Console.WriteLine(string.Join(' ', arr));
        }
    }
}
