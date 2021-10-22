namespace Problem02.Stack
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public class Stack<T> : IAbstractStack<T>
    {
        private Node<T> _top;

        public Stack()
        {
            this._top = null;
        }

        public Stack(Node<T> top)
        {
            this._top = top;
            this.Count = 1;
        }

        public int Count { get; private set; }

        public bool Contains(T item)
        {
            var curr = this._top;
            while (curr != null)
            {
                if (curr.Value.Equals(item))
                {
                    return true;
                }
                curr = curr.Next;
            }

            return false;
        }

        public T Peek()
        {
            this.EnsureNotEmpty();
            return this._top.Value;
        }

        public T Pop()
        {
            this.EnsureNotEmpty();

            var oldTop = this._top;
            var newTop = oldTop.Next;
            oldTop.Next = null;

            this._top = newTop;
            this.Count--;

            return oldTop.Value;
        }

        public void Push(T item)
        {
            var newNode = new Node<T>(item);
            newNode.Next = this._top;
            this._top = newNode;
            this.Count++;
        }

        public IEnumerator<T> GetEnumerator()
        {
            var curr = this._top;
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