using System;

namespace _01Reverse_Array
{
    class Program
    {
        static void Main(string[] args)
        {
            var elements = Console.ReadLine().Split(' ');
            Print(elements, elements.Length - 1);
        }

        private static void Print(string[] arr, int index)
        {
            if (index < 0) { return; }
            Console.Write(arr[index] + " ");
            Print(arr, index - 1);
        }
    }
}
