using System;
using System.Collections.Generic;
using System.Linq;

namespace _07Set_Cover
{
    class Program
    {
        static void Main(string[] args)
        {
            var universe = new[] { 1, 2, 3, 4, 5 };
            int[][] sets = new[]
            {
               new[] { 4 },
               new[] { 1, 2, 3, 4, 5 },
               new[] { 2, 3, 4, 5 },
               new[] { 5 },
               new[] { 3 }
            };

            List<int[]> selectedSets = ChooseSets(sets.ToList(), universe.ToList());

            Console.WriteLine($"Sets to take ({selectedSets.Count}):");

            foreach (int[] set in selectedSets)
            {
                Console.WriteLine($"{{ {string.Join(", ", set)} }}");
            }
        }

        public static List<int[]> ChooseSets(IList<int[]> sets, List<int> universe)
        {
            var takenSets = new List<int[]>();

            while (universe.Any())
            {
                int[] maxSet = null;
                var maxCount = 0;

                GetMaxValues(sets, universe, ref maxSet, ref maxCount);

                takenSets.Add(maxSet);
                sets.Remove(maxSet);
                universe.RemoveAll(maxSet.Contains);
            }

            return takenSets;
        }

        private static void GetMaxValues(IList<int[]> sets, List<int> universe, ref int[] maxSet, ref int maxCount)
        {
            foreach (var currSet in sets)
            {
                var currCount = currSet.Count(universe.Contains);

                if (currCount > maxCount)
                {
                    maxCount = currCount;
                    maxSet = currSet;
                }
            }
        }
    }
}
