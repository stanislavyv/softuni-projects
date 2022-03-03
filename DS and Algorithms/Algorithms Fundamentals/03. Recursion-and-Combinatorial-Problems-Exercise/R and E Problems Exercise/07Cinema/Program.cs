using System;
using System.Collections.Generic;
using System.Linq;

namespace _07Cinema
{
    class Program
    {
        static string[] permutations;
        static string[] seats;
        static bool[] used;

        static void Main(string[] args)
        {
            var peopleList = Console.ReadLine()
                            .Split(", ")
                            .ToList();
            seats = new string[peopleList.Count];

            string cmd;
            while ((cmd = Console.ReadLine()) != "generate")
            {
                var tokens = cmd.Split(" - ");
                var person = tokens[0];
                var seat = int.Parse(tokens[1]);

                seats[seat - 1] = person;
                peopleList.Remove(person);
            }

            permutations = new string[peopleList.Count];
            used = new bool[permutations.Length];

            Permute(peopleList, 0);
        }

        private static void Permute(List<string> people, int index)
        {
            if (index == permutations.Length)
            {
                Print();
            }
            else
            {
                for (int i = 0; i < people.Count; i++)
                {
                    if (!used[i])
                    {
                        used[i] = true;
                        permutations[index] = people[i];
                        Permute(people, index + 1);
                        used[i] = false;
                    }
                }
            }
        }

        private static void Print()
        {
            var counter = 0;
            for (int i = 0; i < seats.Length; i++)
            {
                if (seats[i] != null)
                {
                    Console.Write(seats[i] + " ");
                    continue;
                }
                Console.Write(permutations[counter++] + " ");
            }
            Console.WriteLine();
        }
    }
}
