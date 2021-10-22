namespace Problem02.DoublyLinkedList
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public class DoublyLinkedList<T> : IAbstractLinkedList<T>
    {
        private Node<T> head;
        private Node<T> tail;

        public DoublyLinkedList()
        {
            this.head = this.tail = null;
        }

        public int Count { get; private set; }

        public void AddFirst(T item)
        {
            var newHead = new Node<T>(item);
            if (this.Count == 0)
            {
                this.head = this.tail = newHead;
            }
            else
            {
                this.head.Prev = newHead;
                newHead.Next = this.head;

                this.head = newHead;
            }

            this.Count++;
        }
        public void AddLast(T item)
        {
            var newTail = new Node<T>(item);

            if (this.Count == 0)
            {
                this.head = this.tail = newTail;
            }
            else
            {
                this.tail.Next = newTail;
                newTail.Prev = this.tail;

                this.tail = newTail;
            }

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
            var returnValue = this.head.Item;

            if (this.Count == 1)
            {
                returnValue = this.head.Item;
                this.head = this.tail = null;
            }
            else
            {
                var newHead = this.head.Next;
                this.head.Next = null;
                newHead.Prev = null;

                this.head = newHead;
            }

            this.Count--;
            return returnValue;
        }
        public T RemoveLast()
        {
            this.EnsureNotEmpty();
            var returnValue = this.tail.Item;

            if (this.Count == 1)
            {
                this.head = this.tail = null;
            }
            else
            {
                var newTail = this.tail.Prev;
                this.tail.Prev = null;
                newTail.Next = null;

                this.tail = newTail;
            }

            this.Count--;
            return returnValue;
        }
        public void Reverse()
        {
            this.EnsureNotEmpty();

            Node<T> curr = this.head, temp = null;
            this.tail = this.head;

            while (curr != null)
            {
                temp = curr.Prev;
                curr.Prev = curr.Next;
                curr.Next = temp;
                curr = curr.Prev;
            }

            this.head = temp.Prev;
        }

        public IEnumerator<T> GetEnumerator()
        {
            var curr = this.head;
            while (curr != null)
            {
                yield return curr.Item;
                curr = curr.Next;
            }
        }
        IEnumerator IEnumerable.GetEnumerator()
            => this.GetEnumerator();

        private void EnsureNotEmpty()
        {
            if (this.Count == 0)
            {
                throw new InvalidOperationException();
            }
        }
    }
}