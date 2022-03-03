namespace Problem02.DoublyLinkedList
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    // This is the code from the Lab exercise on writing a simple SinglyLinkedList.
    public class SinglyLinkedList<T> : IAbstractLinkedList<T>
    {
        private Node<T> head;
        private Node<T> tail;

        public int Count { get; private set; }

        public SinglyLinkedList()
        {
            this.head = this.tail = null;
        }

        public void AddFirst(T item)
        {
            var newNode = new Node<T>(item);
            newNode.Next = this.head;

            if (this.Count == 0) { this.tail = newNode; }
            this.head = newNode;

            this.Count++;
        }
        public void AddLast(T item)
        {
            var newNode = new Node<T>(item);
            if (this.tail == null) { this.head = newNode; }
            else { this.tail.Next = newNode; }

            this.tail = newNode;
            this.Count++;
        }
        public T GetFirst()
        {
            this.EnsureNotEmpty();
            return this.head.Item;
        }
        public T GetLast()
        {
            this.EnsureNotEmpty();
            return this.tail.Item;
        }
        public T RemoveFirst()
        {
            this.EnsureNotEmpty();

            var headItem = this.head.Item;
            var newHead = this.head.Next;

            this.head.Next = null;
            this.head = newHead;
            this.Count--;

            if (this.Count == 0) { this.tail = null; }

            return headItem;
        }
        public T RemoveLast()
        {
            this.EnsureNotEmpty();
            if (this.head.Next == null) { return this.RemoveFirst(); }

            var current = this.head;

            while (current.Next.Next != null)
            {
                current = current.Next;
            }

            var lastItem = current.Next.Item;
            current.Next = null;

            this.tail = current;
            this.Count--;

            return lastItem;
        }
        public void Reverse()
        {
            this.EnsureNotEmpty();

            Node<T> prev = null, curr = this.head, next = null;
            this.tail = this.head;

            while (curr != null)
            {
                next = curr.Next;
                curr.Next = prev;
                prev = curr;
                curr = next;
            }
            this.head = prev;
        }

        public IEnumerator<T> GetEnumerator()
        {
            var current = this.head;

            while (current != null)
            {
                yield return current.Item;
                current = current.Next;
            }
        }
        IEnumerator IEnumerable.GetEnumerator() => this.GetEnumerator();

        private void EnsureNotEmpty()
        {
            if (this.Count == 0)
                throw new InvalidOperationException();
        }
    }
}