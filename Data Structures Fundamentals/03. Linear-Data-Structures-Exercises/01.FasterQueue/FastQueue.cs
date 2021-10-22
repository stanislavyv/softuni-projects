namespace Problem01.FasterQueue
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public class FastQueue<T> : IAbstractQueue<T>
    {
        private Node<T> _head;
        private Node<T> _tail;

        public FastQueue()
        {
            this._head = this._tail = null;
        }

        public int Count { get; private set; }

        public bool Contains(T item)
        {
            this.EnsureNotEmpty();

            var curr = this._head;
            while (curr != null)
            {
                if (curr.Item.Equals(item))
                {
                    return true;
                }
                curr = curr.Next;
            }

            return false;
        }

        public T Dequeue()
        {
            this.EnsureNotEmpty();
            T removeValue;

            removeValue = this._head.Item;

            if (this.Count == 1)
            {
                this._head = this._tail = null;
            }
            else
            {
                var oldHead = this._head;
                this._head = this._head.Next;
                oldHead.Next = null;
            }

            this.Count--;
            return removeValue;
        }

        public void Enqueue(T item)
        {
            var newTail = new Node<T>(item);

            var curr = this._tail;
            if (curr == null)
            {
                this._head = this._tail = newTail;
            }
            else
            {
                this._tail.Next = newTail;
                this._tail = newTail;
            }

            this.Count++;
        }

        public T Peek()
        {
            this.EnsureNotEmpty();
            return this._head.Item;
        }

        public IEnumerator<T> GetEnumerator()
        {
            var curr = this._head;
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