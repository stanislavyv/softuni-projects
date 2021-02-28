namespace Custom_Doubly_Linked_List
{
    public class ListNode
    {
        public int Value { get; set; }
        public ListNode PreviousNode { get; set; }
        public ListNode NextNode { get; set; }

        public ListNode(int value)
        {
            this.Value = value;
        }


    }
}
