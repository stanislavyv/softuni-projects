using System;
using System.Collections.Generic;

namespace _04Hanoi_Tower
{
    class Program
    {
        static Stack<int> source;
        static Stack<int> spare;
        static Stack<int> destination;
        static int steps;

        static void Main(string[] args)
        {
            var n = int.Parse(Console.ReadLine());

            source = new Stack<int>(n);
            for (int i = n; i >= 1; i--)
            {
                source.Push(i);
            }

            spare = new Stack<int>(n);
            destination = new Stack<int>(n);

            // Initial look
            Print();
            steps++;
            Solve(n, source, destination, spare);
        }

        private static void Solve(int disk, Stack<int> source, Stack<int> destination, Stack<int> spare)
        {
            if (disk < 1) { return; }

            if (disk == 1)
            {
                destination.Push(source.Pop());
                Print();
            }
            else
            {
                Solve(disk - 1, source, spare, destination);
                Solve(1, source, destination, spare);
                Solve(disk - 1, spare, destination, source);
            }
        }

        private static void Print()
        {
            if (steps > 0)
            {
                Console.WriteLine($"Step #{steps++}: Moved disk");
            }

            Console.WriteLine($"Source: {string.Join(", ", source)}");
            Console.WriteLine($"Destination: {string.Join(", ", destination)}");
            Console.WriteLine($"Spare: {string.Join(", ", spare)}");

            Console.WriteLine();
        }
    }
}
