using System;
using System.Collections.Generic;

namespace _08Word_Cruncher
{
    class Program
    {
        static string target;
        static List<string> current;
        static Dictionary<int, List<string>> wordsByLength;
        static Dictionary<string, int> occurences;

        public static void Main(string[] args)
        {
            var inputWords = Console.ReadLine().Split(", ");
            target = Console.ReadLine();

            Init(inputWords);

            Solve(target.Length);
        }

        private static void Solve(int length)
        {
            if (length == 0)
            {
                Print();
                return;
            }

            foreach (var kvp in wordsByLength)
            {
                var currWordLength = kvp.Key;

                if (currWordLength <= length)
                {
                    foreach (var word in kvp.Value)
                    {
                        current.Add(word);
                        // this check is done to ensure that 
                        // there won't be any duplicates
                        if (occurences[word] > 0 &&
                            IsMatchingSoFar(target, current))
                        { 
                            occurences[word] -= 1;
                            Solve(length - currWordLength); 
                            occurences[word] += 1;
                        }

                        current.RemoveAt(current.Count - 1);
                    }
                }
            }
        }
        private static void Print()
        {
            Console.WriteLine(string.Join(' ', current));
        }
        private static bool IsMatchingSoFar(string actual, List<string> current)
        {
            return actual.StartsWith(string.Join(string.Empty, current));
        }
        private static void Init(string[] inputWords)
        {
            current = new List<string>();
            wordsByLength = new Dictionary<int, List<string>>();
            occurences = new Dictionary<string, int>();

            foreach (var word in inputWords)
            {
                if (!wordsByLength.ContainsKey(word.Length))
                {
                    wordsByLength[word.Length] = new List<string>();
                }
                wordsByLength[word.Length].Add(word);

                if (!occurences.ContainsKey(word))
                {
                    occurences[word] = 0;
                }
                occurences[word] += 1;
            }
        }
    }
}
