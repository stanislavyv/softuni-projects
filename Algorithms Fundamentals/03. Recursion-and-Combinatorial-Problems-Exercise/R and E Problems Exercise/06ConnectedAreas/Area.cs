using System;

namespace _06ConnectedAreas
{
    internal class Area : IComparable<Area>
    {
        public Area(int row, int col)
        {
            this.Row = row;
            this.Col = col;
        }

        public int Row { get; private set; }
        public int Col { get; private set; }
        public int Size { get; set; }

        public int CompareTo(Area other)
        {
            if (this.Size != other.Size)
            {
                // Needs to be in descending order
                return other.Size.CompareTo(this.Size);
            }

            if (this.Row != other.Row)
            {
                return this.Row.CompareTo(other.Row);
            }

            return this.Col.CompareTo(other.Col);
        }
    }
}
