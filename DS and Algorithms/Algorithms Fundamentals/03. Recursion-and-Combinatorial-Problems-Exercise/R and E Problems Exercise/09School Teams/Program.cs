using System;

namespace _09School_Teams
{
    class Program
    {
        static string[] girlsComb;
        static string[] boysComb;
        static string[] inputGirls;
        static string[] inputBoys;

        static void Main(string[] args)
        {
            inputGirls = Console.ReadLine().Split(", ");
            inputBoys = Console.ReadLine().Split(", ");

            girlsComb = new string[3];
            boysComb = new string[2];

            GetGirlsComb();
        }

        private static void GetGirlsComb(int index = 0, int start = 0)
        {
            if (index == girlsComb.Length)
            {
                GetBoysComb();
                return;
            }

            for (int i = start; i < inputGirls.Length; i++)
            {
                girlsComb[index] = inputGirls[i];
                GetGirlsComb(index + 1, i + 1);
            }
        }
        private static void GetBoysComb(int index = 0, int start = 0)
        {
            if (index == boysComb.Length)
            {
                Print();
                return;
            }

            for (int i = start; i < inputBoys.Length; i++)
            {
                boysComb[index] = inputBoys[i];
                GetBoysComb(index + 1, i + 1);
            }
        }
        private static void Print()
        {
            Console.WriteLine(string.Join(", ", girlsComb) + ", " + string.Join(", ", boysComb));
        }
    }
}
