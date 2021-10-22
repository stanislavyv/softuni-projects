namespace Problem04.BalancedParentheses
{
    using System.Collections.Generic;
    using System.Linq;

    public class BalancedParenthesesSolve : ISolvable
    {
        public BalancedParenthesesSolve() { }

        public bool AreBalanced(string parentheses)
        {
            if (string.IsNullOrEmpty(parentheses) ||
                parentheses.Length % 2 != 0) { return false; }

            var closingStack = new Stack<char>();

            foreach (var curr in parentheses)
            {
                char expected = default;
                switch (curr)
                {
                    case '}':
                        expected = '{';
                        break;
                    case ']':
                        expected = '[';
                        break;
                    case ')':
                        expected = '(';
                        break;
                    default:
                        closingStack.Push(curr);
                        break;
                }

                if (expected != default && closingStack.Pop() != expected)
                {
                    return false;
                }
            }

            return closingStack.Count == 0;
        }
    }
}
