namespace _01._BrowserHistory
{
    public class Node<T>
    {
        public Node(T value, Node<T> next = null, Node<T> prev = null)
        {
            this.Value = value;
            this.Next = next;
            this.Prev = prev;
        }

        public T Value { get; set; }
        public Node<T> Next { get; set; }
        public Node<T> Prev { get; set; }
    }
}
