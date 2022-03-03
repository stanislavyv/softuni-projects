namespace Problem03.Queue
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public class Queue<T> : IAbstractQueue<T>
    {
        private Node<T> _head;

        public int Count { get; private set; }

        public Queue()
        {
            this._head = null;
        }

        public bool Contains(T item)
        {
            EnsureNotEmpty();

            var curr = this._head;
            while (curr != null)
            {
                if (curr.Value.Equals(item)) { return true; }
                curr = curr.Next;
            }

            return false;
        }

        public T Dequeue()
        {
            this.EnsureNotEmpty();

            var oldHead = this._head;
            this._head = oldHead.Next;
            oldHead.Next = null;
            this.Count--;

            return oldHead.Value;
        }

        public void Enqueue(T item)
        {
            var curr = this._head;
            var newNode = new Node<T>(item);

            if (curr == null)
            {
                this._head = newNode;
            }
            else
            {
                while (curr.Next != null)
                {
                    curr = curr.Next;
                }
                curr.Next = newNode;
            }

            this.Count++;
        }

        public T Peek()
        {
            this.EnsureNotEmpty();
            return this._head.Value;
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

    }
}