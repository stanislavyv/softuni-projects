namespace Custom_Doubly_Linked_List
{
    public class ListNode<T>
    {
        public T Value { get; set; }
        public ListNode<T> PreviousNode { get; set; }
        public ListNode<T> NextNode { get; set; }

        public ListNode(T value = default)
        {
            this.Value = value;
        }
    }
}
