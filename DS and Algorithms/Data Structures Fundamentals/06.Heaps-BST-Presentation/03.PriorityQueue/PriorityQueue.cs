namespace _03.PriorityQueue
{
    using System;
    using System.Collections.Generic;

    public class PriorityQueue<T> : IAbstractHeap<T>
        where T : IComparable<T>
    {
        private List<T> elements;

        public PriorityQueue()
        {
            this.elements = new List<T>();
        }

        public int Size => this.elements.Count;

        public T Dequeue()
        {
            this.EnsureNotEmpty();

            var oldRoot = this.elements[0];
            this.Swap(0, this.Size - 1);
            this.elements.RemoveAt(this.Size - 1);

            this.HeapifyDown(0);
            return oldRoot;
        }
        public void Add(T element)
        {
            this.elements.Add(element);
            this.HeapifyUp(this.Size - 1);
        }
        public T Peek()
        {
            this.EnsureNotEmpty();
            return this.elements[0];
        }

        private void EnsureNotEmpty()
        {
            if (this.Size == 0)
            {
                throw new InvalidOperationException("PriorityQueue is empty!");
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
            return index >= 0 && index < this.Size;
        }
        private int GetParentIndex(int childIndex)
        {
            return (childIndex - 1) / 2;
        }
        private int GetLeftChildIndex(int parentIndex)
        {
            return parentIndex * 2 + 1;
        }
        private int GetRightChildIndex(int parentIndex)
        {
            return parentIndex * 2 + 2;
        }
        private bool IsGreater(int firstIndex, int secondIndex)
        {
            var firstEl = this.elements[firstIndex];
            var secondEl = this.elements[secondIndex];

            return firstEl.CompareTo(secondEl) > 0;
        }
        private bool IsLesser(int firstIndex, int secondIndex)
        {
            var firstEl = this.elements[firstIndex];
            var secondEl = this.elements[secondIndex];

            return firstEl.CompareTo(secondEl) < 0;
        }
        /// <summary>
        /// Returns the index of the greater element.
        /// </summary>
        /// <param name="leftIndex"></param>
        /// <param name="rightIndex"></param>
        /// <returns></returns>
        private int GetGreaterChild(int leftIndex, int rightIndex)
        {
            var isLeftValid = this.IsValidIndex(leftIndex);
            var isRightValid = this.IsValidIndex(rightIndex);

            if (isLeftValid &&
                !isRightValid)
            {
                return leftIndex;
            }
            else if (!isLeftValid &&
                     isRightValid)
            {
                return rightIndex;
            }
            else if (!isLeftValid && 
                     !isRightValid)
            {
                return -1;
            }
            
            return this.IsGreater(leftIndex, rightIndex)
                ? leftIndex
                : rightIndex;
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
        private void HeapifyDown(int parentIndex)
        {
            var leftIndex = this.GetLeftChildIndex(parentIndex);
            var rightIndex = this.GetRightChildIndex(parentIndex);

            var greaterChildIndex = this.GetGreaterChild(leftIndex, rightIndex);

            if (this.IsValidIndex(greaterChildIndex) &&
                this.IsLesser(parentIndex, greaterChildIndex))
            {
                this.Swap(parentIndex, greaterChildIndex);
                this.HeapifyDown(greaterChildIndex);
            }
        }
    }
}
