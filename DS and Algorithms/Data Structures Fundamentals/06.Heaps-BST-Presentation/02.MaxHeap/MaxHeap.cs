namespace _02.MaxHeap
{
    using System;

    public class MaxHeap<T> : IAbstractHeap<T>
        where T : IComparable<T>
    {
        private T[] elements;
        private int count;

        public MaxHeap()
        {
            this.elements = new T[2];
        }

        public int Size => this.count;

        public void Add(T element)
        {
            this.ResizeIfNecessary();
            this.elements[this.count++] = element;
            this.HeapifyUp(this.count - 1);
        }
        public T Peek()
        {
            this.EnsureNotEmpty();
            return this.elements[0];
        }

        private void EnsureNotEmpty()
        {
            if (this.count == 0)
            {
                throw new InvalidOperationException("MaxHeap is empty!");
            }
        }
        private void ResizeIfNecessary()
        {
            if (this.count == this.elements.Length)
            {
                var newArr = new T[this.count * 2];
                Array.Copy(this.elements, newArr, this.count);
                this.elements = newArr;
            }
        }
        private void Swap(int firstIndex, int secondIndex)
        {
            var temp = this.elements[firstIndex];
            this.elements[firstIndex] = this.elements[secondIndex];
            this.elements[secondIndex] = temp;
        }
        private bool IsValidIndex(int index)
        {
            return index >= 0;
        }
        private int GetParentIndex(int childIndex)
        {
            return (childIndex - 1) / 2;
        }
        private bool IsGreater(int childIndex, int parentIndex)
        {
            var childEl = this.elements[childIndex];
            var parentEl = this.elements[parentIndex];

            return childEl.CompareTo(parentEl) > 0;
        }
        private void HeapifyUp(int childIndex)
        {
            var parentIndex = this.GetParentIndex(childIndex);

            if (this.IsValidIndex(parentIndex) &&
                this.IsGreater(childIndex, parentIndex))
            {
                this.Swap(parentIndex, childIndex);
                this.HeapifyUp(parentIndex);
            }
        }
    }
}
