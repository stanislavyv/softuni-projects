namespace Problem04.SinglyLinkedList
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public class SinglyLinkedList<T> : IAbstractLinkedList<T>
    {
        private Node<T> _head;

        public SinglyLinkedList()
        {
            this._head = null;
        }

        public int Count { get; private set; }

        public void AddFirst(T item)
        {
            var newHead = new Node<T>(item);
            newHead.Next = this._head;
            this._head = newHead;
            this.Count++;
        }
        public void AddLast(T item)
        {
            var newNode = new Node<T>(item);

            if (this._head == null)
            {
                this._head = newNode;
            }
            else
            {
                var last = this.GetLastNode();
                last.Next = new Node<T>(item);
            }

            this.Count++;
        }
        public T GetFirst()
        {
            this.EnsureNotEmpty();
            return this._head.Value;
        }
        public T GetLast()
        {
            return this.GetLastNode().Value;
        }
        public T RemoveFirst()
        {
            this.EnsureNotEmpty();

            var oldHead = this._head;
            this._head = oldHead.Next;
            oldHead.Next = null;

            this.Count--;
            return oldHead.Value;
        }
        public T RemoveLast()
        {
            this.EnsureNotEmpty();
            var curr = this._head;
            T returnValue;

            if (curr.Next == null)
            {
                returnValue = this._head.Value;
                this._head = null;
            }
            else
            {
                while (curr.Next.Next != null)
                {
                    curr = curr.Next;
                }
                returnValue = curr.Next.Value;
                curr.Next = null;
            }

            this.Count--;
            return returnValue;
        }
        public void Reverse()
        {
            Node<T> prev = null, curr = this._head, next = null;
            while (curr != null)
            {
                next = curr.Next;
                curr.Next = prev;
                prev = curr;
                curr = next;
            }
            this._head = prev;
        }

        public IEnumerator<T> GetEnumerator()
        {
            var curr = this._head;
            while (curr != null)
            {
                yield return curr.Value;
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
        private Node<T> GetLastNode()
        {
            this.EnsureNotEmpty();

            var curr = this._head;
            while (curr.Next != null)
            {
                curr = curr.Next;
            }

            return curr;
        }
    }
}