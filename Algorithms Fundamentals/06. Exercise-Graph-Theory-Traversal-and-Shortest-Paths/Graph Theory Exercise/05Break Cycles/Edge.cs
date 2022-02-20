using System;
using System.Diagnostics.CodeAnalysis;

namespace _05Break_Cycles
{
    internal class Edge
    {
        public Edge(string from, string to)
        {
            this.From = from;
            this.To = to;
        }

        public string From { get; }
        public string To { get; }

        public override string ToString()
        {
            return $"{this.From} - {this.To}";
        }
    }
}
