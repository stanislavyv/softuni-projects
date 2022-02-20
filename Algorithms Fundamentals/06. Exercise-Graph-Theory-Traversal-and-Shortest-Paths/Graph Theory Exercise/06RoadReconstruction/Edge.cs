using System;

namespace _06RoadReconstruction
{
    class Edge
    {
        public Edge(int from, int to)
        {
            this.From = from;
            this.To = to;
        }

        public int From { get; }
        public int To { get; }

        /// <summary>
        /// Returns a new edge with reversed source and destination: 3 0 -> 0 3
        /// </summary>
        /// <returns></returns>
        public Edge Reverse()
        {
            return new Edge(this.To, this.From);
        }

        public override string ToString()
        {
            return $"{this.From} {this.To}";
        }
    }
}
