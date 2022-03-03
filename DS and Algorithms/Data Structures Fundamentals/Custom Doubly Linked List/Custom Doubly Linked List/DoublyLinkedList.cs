using System;
using System.Collections.Generic;

namespace Custom_Doubly_Linked_List
{
    class DoublyLinkedList<T>
    {
        private ListNode<T> head;
        private ListNode<T> tail;

        public DoublyLinkedList()
        {
            this.head = new ListNode<T>();
            this.tail = new ListNode<T>();
        }

        public int Count { get; private set; }

        public void AddFirst(T element)
        {
            if (this.Count == 0)
            {
                this.head = this.tail = new ListNode<T>(element);
            }
            else
            {
                var newHead = new ListNode<T>(element);
                newHead.NextNode = this.head;
                this.head.PreviousNode = newHead;
                this.head = newHead;
            }

            this.Count++;
        }

        public void AddLast(T element)
        {
            if (this.Count == 0)
            {
                this.head = this.tail = new ListNode<T>(element);
            }
            else
            {
                var newTail = new ListNode<T>(element);
                newTail.PreviousNode = this.tail;
                this.tail.NextNode = newTail;
                this.tail = newTail;
            }

            this.Count++;
        }

        public T RemoveFirst()
        {
            if (this.Count == 0)
            {
                throw new InvalidOperationException("The list is empty");
            }

            var firstElement = this.head.Value;
            this.head = this.head.NextNode;

            if (this.head != null)
            {
                this.head.PreviousNode = null;
            }
            else
            {
                this.tail = null;
            }

            this.Count--;

            return firstElement;
        }

        public T RemoveLast()
        {
            if (this.Count == 0)
            {
                throw new InvalidOperationException("The list is empty");
            }

            var lastElement = this.tail.Value;
            this.tail = this.tail.PreviousNode;

            if (this.tail != null)
            {
                this.tail.NextNode= null;
            }
            else
            {
                this.head = null;
            }

            this.Count--;

            return lastElement;
        }

        public ListNode<T> GetNode(int index)
        {
            if (index < 0 || index >= this.Count)
            {
                throw new IndexOutOfRangeException("Index must be inside the bounds of the List");
            }

            var currNode = this.head;

            for (int i = 0; i < this.Count; i++)
            {
                if (i == index)
                {
                    break;
                }
                currNode = currNode.NextNode;
            }

            return currNode;
        }

        public void ForEach(Action<T> action)
        {
            var currNode = this.head;

            while (currNode != null)
            {
                action(currNode.Value);
                currNode = currNode.NextNode;
            }
        }

        public T[] ToArray()
        {
            T[] arr = new T[this.Count];
            int counter = 0;
            var currNode = this.head;

            while (currNode != null)
            {
                arr[counter] = currNode.Value;
                currNode = currNode.NextNode;
                counter++;
            }

            return arr;
        }
    }
}
