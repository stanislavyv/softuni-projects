using System;

namespace _07RecursiveFibonacci
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());
            var res = GetFibonacci(n);
            Console.WriteLine(res);
        }

        static int GetFibonacci(int n)
        {
            if (n <= 1)
            {
                return 1;
            }

            return GetFibonacci(n - 1) + GetFibonacci(n - 2);
        }
    }
}
