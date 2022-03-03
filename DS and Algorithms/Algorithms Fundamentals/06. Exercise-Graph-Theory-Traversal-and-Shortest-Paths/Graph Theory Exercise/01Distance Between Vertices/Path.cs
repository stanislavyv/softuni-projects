using System;

namespace _01Distance_Between_Vertices
{
    internal class Path
    {
        public Path(string source, string destination, int length)
        {
            this.Source = source;
            this.Destination = destination;
            this.Length = length;
        }

        public string Source { get; private set; }
        public string Destination { get; private set; }
        public int Length { get; private set; }
    }
}
