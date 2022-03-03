namespace _03.MinHeap
{
    using System;
    using System.Collections.Generic;

    public class MinHeap<T> : IAbstractHeap<T>
        where T : IComparable<T>
    {
        private List<T> _elements;

        public MinHeap()
        {
            this._elements = new List<T>();
        }

        public int Size => this._elements.Count;
        public T Dequeue()
        {
            var lastIndex = this.Size - 1;
            this.Swap(0, lastIndex);

            var oldRoot = this._elements[lastIndex];
            this._elements.RemoveAt(lastIndex);

            this.HeapifyDown();
            return oldRoot;
        }
        public void Add(T element)
        {
            this._elements.Add(element);
            this.HeapifyUp(element);
        }
        public T Peek()
        {
            return this._elements[0];
        }

        private void HeapifyUp(T element)
        {
            var currIndex = this.Size - 1;
            var parentIndex = this.GetParentIndex(currIndex);

            while (this.IsValidIndex(parentIndex) &&
                   this.IsLess(currIndex, parentIndex))
            {
                var parentEl = this._elements[parentIndex];
                this.Swap(parentIndex, currIndex);

                currIndex = parentIndex;
                parentIndex = this.GetParentIndex(currIndex);
            }
        }
        private void HeapifyDown()
        {
            var currIndex = 0;
            var leftIndex = this.GetLeftChildIndex(currIndex);

            while (this.IsValidIndex(leftIndex) &&
                   this.IsGreater(currIndex, leftIndex))
            {
                var toSwapWith = leftIndex;
                var rightIndex = this.GetRightChildIndex(currIndex);

                if (this.IsValidIndex(rightIndex) &&
                    this.IsGreater(toSwapWith, rightIndex))
                {
                    toSwapWith = rightIndex;
                }

                this.Swap(currIndex, toSwapWith);
                currIndex = toSwapWith;
                leftIndex = this.GetLeftChildIndex(currIndex);
            }
        }
        private int GetParentIndex(int index)
        {
            return (index - 1) / 2;
        }
        private int GetLeftChildIndex(int index)
        {
            return (index * 2) + 1;
        }
        private int GetRightChildIndex(int index)
        {
            return (index * 2) + 2;
        }
        private bool IsLess(int firstIndex, int secondIndex)
        {
            var first = this._elements[firstIndex];
            var second = this._elements[secondIndex];

            return first.CompareTo(second) < 0;
        }
        private bool IsGreater(int firstIndex, int secondIndex)
        {
            var first = this._elements[firstIndex];
            var second = this._elements[secondIndex];

            return first.CompareTo(second) > 0;
        }
        private bool IsValidIndex(int index)
        {
            return index >= 0 && index < this.Size;
        }
        private void Swap(int firstIndex, int secondIndex)
        {
            var temp = this._elements[firstIndex];
            this._elements[firstIndex] = this._elements[secondIndex];
            this._elements[secondIndex] = temp;
        }
    }
}
