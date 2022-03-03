using System;
using Wintellect.PowerCollections;

namespace _04.CookiesProblem
{
    public class CookiesProblem
    {
        public int Solve(int k, int[] cookies)
        {
            var numOperations = 0;
            var bag = new OrderedBag<int>(cookies);

            while (bag.Count > 1)
            {
                var first = bag.RemoveFirst();
                var second = 0;

                if (bag.Count > 0)
                {
                    second = bag.RemoveFirst();
                }

                var sum = first + (2 * second);
                bag.Add(sum);
                numOperations++;

                if (bag.GetFirst() >= k)
                {
                    return numOperations;
                }
            }

            return -1;
        }
    }
}
