namespace _02Areas_in_Matrix
{
    internal class Node
    {
        public Node(int row, int col)
        {
            this.Row = row;
            this.Col = col;
        }

        public int Row { get; private set; }
        public int Col { get; private set; }
    }
}
