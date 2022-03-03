namespace Problem02.DoublyLinkedList
{
    public class Node<T>
    {
        public Node(T item)
        {
            this.Item = item;
            this.Next = this.Prev = null;
        }

        public T Item { get; set; }
        public Node<T> Next { get; set; }
        public Node<T> Prev { get; set; }
    }
}