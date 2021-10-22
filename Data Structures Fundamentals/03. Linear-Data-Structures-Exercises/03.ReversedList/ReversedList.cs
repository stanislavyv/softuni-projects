namespace Problem03.ReversedList
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public class ReversedList<T> : IAbstractList<T>
    {
        private const int DEFAULT_CAPACITY = 4;

        private T[] _items;

        public ReversedList()
            : this(DEFAULT_CAPACITY) { }

        public ReversedList(int capacity)
        {
            if (capacity < 0)
                throw new ArgumentOutOfRangeException(nameof(capacity));

            this._items = new T[capacity];
        }

        public T this[int index]
        {
            get
            {
                this.ValidateIndex(index);
                return this._items[this.Count - 1 - index];
            }
            set
            {
                this.ValidateIndex(index);
                this._items[index] = value;
            }
        }

        public int Count { get; private set; }

        public void Add(T item)
        {
            this.ResizeIfNecessary();
            this._items[this.Count] = item;
            this.Count++;
        }

        public bool Contains(T item)
        {
            return this.IndexOf(item) != -1;
        }

        public int IndexOf(T item)
        {
            this.EnsureNotEmpty();
            for (int i = this.Count - 1; i >= 0; i--)
            {
                if (this._items[i].Equals(item))
                {
                    return this.Count - 1 - i;
                }
            }

            return -1;
        }

        public void Insert(int index, T item)
        {
            this.ValidateIndex(index);
            this.ResizeIfNecessary();

            for (int i = this.Count; i > this.Count - index; i--)
            {
                this._items[i] = this._items[i - 1];
            }

            this._items[this.Count - index] = item;
            this.Count++;
        }

        public bool Remove(T item)
        {
            var initialCount = this.Count;
            var itemIndex = this.IndexOf(item);

            if (itemIndex == -1) { return false; }

            this.RemoveAt(itemIndex);
            return initialCount > this.Count ? true : false;
        }

        public void RemoveAt(int index)
        {
            this.ValidateIndex(index);
            this.EnsureNotEmpty();

            var elIndex = this.Count - 1 - index;

            for (int j = elIndex; j < this.Count - 1; j++)
            {
                this._items[j] = this._items[j + 1];
            }
            this._items[this.Count - 1] = default;
            this.Count--;
        }

        public IEnumerator<T> GetEnumerator()
        {
            for (int i = this.Count - 1; i >= 0; i--)
            {
                yield return this._items[i];
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

        private void ValidateIndex(int index)
        {
            if (index < 0 || index >= this.Count)
            {
                throw new IndexOutOfRangeException();
            }
        }

        private void ResizeIfNecessary()
        {
            if (this.Count == this._items.Length)
            {
                var newItems = new T[this.Count * 2];
                Array.Copy(this._items, newItems, this.Count);
                this._items = newItems;
            }
        }

    }
}