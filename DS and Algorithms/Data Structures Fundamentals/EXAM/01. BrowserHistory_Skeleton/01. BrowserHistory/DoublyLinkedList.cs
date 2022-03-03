using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using _01._BrowserHistory.Interfaces;

namespace _01._BrowserHistory
{
    public class DoublyLinkedList<T> : IEnumerable<T>
        where T : ILink
    {
        private Node<T> head;
        private Node<T> tail;

        // TODO: Sort()? -> Ascending/ Descending

        public DoublyLinkedList()
        {
            this.head = null;
            this.tail = null;
        }
        public DoublyLinkedList(DoublyLinkedList<T> toCopy)
        {
            if (toCopy == null) { throw new ArgumentNullException(); }

            foreach (var element in toCopy)
            {
                this.AddLast(element);
            }

            this.head = toCopy.head;
            this.tail = toCopy.tail;
        }
        public DoublyLinkedList(Node<T> head)
        {
            if (head == null) { throw new ArgumentNullException(); }

            this.head = head;
            Node<T> curr = head, prev = null;
            while (curr != null)
            {
                this.AddLast(curr.Value);
                curr = curr.Next;
                prev = curr;
            }

            this.tail = prev ?? head;
        }
        public DoublyLinkedList(params T[] elements)
        {
            this.AddMany(elements);
        }
        public DoublyLinkedList(IEnumerable<T> elements)
        {
            this.AddMany(elements);
        }

        public int Count { get; private set; }

        public T this[int i]
        {
            get
            {
                this.EnsureNotEmpty();
                this.ValidateIndex(i);

                var curr = this.head;

                for (int j = 0; j < i; j++)
                {
                    curr = curr.Next;
                }

                return curr.Value;
            }
            set
            {
                this.EnsureNotEmpty();
                this.ValidateIndex(i);

                var curr = this.head;

                if (i == 0)
                {
                    this.head.Value = value;

                    if (this.Count == 1)
                    {
                        this.tail.Value = value;
                    }

                    return;
                }

                for (int j = 0; j < i - 1; j++)
                {
                    curr = curr.Next;
                }

                if (curr.Next == null)
                {
                    this.tail.Value = value;
                }

                curr.Next.Value = value;
            }
        }

        public void AddFirst(T item)
        {
            var newHead = new Node<T>(item);

            if (this.Count == 0)
            {
                this.head = newHead;
                this.tail = this.head;
            }
            else
            {
                newHead.Next = this.head;
                this.head.Prev = newHead;
                this.head = newHead;
            }

            this.Count++;
        }
        public void AddLast(T item)
        {
            var newTail = new Node<T>(item);

            if (this.Count == 0)
            {
                this.head = newTail;
                this.tail = this.head;
            }
            else
            {
                var oldTail = this.tail;
                oldTail.Next = newTail;
                newTail.Prev = oldTail;

                this.tail = newTail;
            }

            this.Count++;
        }
        /// <summary>
        /// Adds elements at the end of the list
        /// </summary>
        /// <param name="elements"></param>
        public void AddMany(params T[] elements)
        {
            foreach (var element in elements)
            {
                this.AddLast(element);
            }
        }
        public void AddMany(IEnumerable<T> elements)
        {
            foreach (var element in elements)
            {
                this.AddLast(element);
            }
        }
        public T GetFirst()
        {
            this.EnsureNotEmpty();
            return this.head.Value;
        }
        public T GetLast()
        {
            this.EnsureNotEmpty();
            return this.tail.Value;
        }
        public T GetByIndex(int index)
        {
            return this[index];
        }
        public T Remove(T element)
        {
            this.EnsureNotEmpty();
            if (this.AreEqual(this.head, element)) { return this.RemoveLast(); }
            if (this.AreEqual(this.tail, element)) { return this.RemoveFirst(); }

            Node<T> prev = null, curr = this.head, next = null;
            while (curr != null)
            {
                if (this.AreEqual(curr, element)) { break; }

                curr = curr.Next;
                prev = curr.Prev;
                next = curr.Next;
            }

            if (curr == null) { return default; }

            prev.Next = next;
            next.Prev = prev;

            // This might be meaningless, I'm not quite sure if curr is going to 
            // be deleted from the memory without it
            curr.Next = null;
            curr.Prev = null;

            return curr.Value;
        }
        public T RemoveFirst()
        {
            this.EnsureNotEmpty();

            var oldHead = this.head;
            this.head = oldHead.Next;

            if (this.head != null) { this.head.Prev = null; }
            else { this.tail = null; }

            oldHead.Next = null;

            this.Count--;
            return oldHead.Value;
        }
        public T RemoveLast()
        {
            this.EnsureNotEmpty();
            var oldTail = this.tail;
            this.tail = this.tail.Prev;

            if (this.tail != null) { this.tail.Next = null; }
            else { this.head = null; }

            oldTail.Prev = null;

            this.Count--;
            return oldTail.Value;
        }
        public T RemoveAt(int index)
        {
            this.EnsureNotEmpty();
            this.ValidateIndex(index);

            if (index == this.Count - 1) { return this.RemoveLast(); }
            if (index == 0) { return this.RemoveFirst(); }

            Node<T> prev = null, curr = this.head, next = null;
            for (int i = 0; i < index - 1; i++)
            {
                curr = curr.Next;
                prev = curr.Prev;
                next = curr.Next;
            }

            prev.Next = next;
            next.Prev = prev;

            // This might be meaningless, I'm not quite sure if curr is going to 
            // be deleted from the memory without it
            curr.Next = null;
            curr.Prev = null;

            return curr.Value;
        }
        public void Clear()
        {
            this.Count = 0;
            this.head = null;
            this.tail = null;
        }
        public bool Contains(T element)
        {
            foreach (var curr in this)
            {
                if (this.AreEqual(element, curr)) { return true; }
            }

            return false;
        }
        public void Reverse()
        {
            this.EnsureNotEmpty();

            this.tail = this.head;

            Node<T> temp = null, curr = this.head;
            while (curr != null)
            {
                temp = curr.Prev;
                curr.Prev = curr.Next;
                curr.Next = temp;
                curr = temp;
            }

            this.tail = this.head;
            if (temp != null) { this.head = temp.Prev; }
        }
        // Honestly no idea if the swapping nodes method works
        public void Swap(T first, T second)
        {
            // Swapping values method:

            // Nothing to do if x and y are same
            if (this.AreEqual(first, second)) { return; }

            // Search for elements
            Node<T> currFirst = null, currSecond = null;

            var currEl = this.head;
            while (currEl != null)
            {
                if (this.AreEqual(currEl, first)) { currFirst = currEl; }
                else if (this.AreEqual(currEl, second)) { currSecond = currEl; }

                currEl = currEl.Next;
            }

            // If either first or second is not present, nothing to do
            if (currFirst == null || currSecond == null) { return; }

            var temp = currFirst.Value;
            currFirst.Value = currSecond.Value;
            currSecond.Value = temp;

            // Swapping nodes method:
            //// Nothing to do if x and y are same
            //if (first == second)
            //    return;

            //// Search for first (keep track of prevFirst and currFirst)
            //Node<T> prevFirst = null, currFirst = head, nextFirst = null;
            //while (currFirst != null && !currFirst.Value.Equals(first))
            //{
            //    prevFirst = currFirst;
            //    currFirst = currFirst.Next;
            //    nextFirst = currFirst.Next;
            //}

            //// Search for second (keep track of prevSecond and currSecond)
            //Node<T> prevSecond = null, currSecond = head, nextSecond = null;
            //while (currSecond != null && !currSecond.Value.Equals(second))
            //{
            //    prevSecond = currSecond;
            //    currSecond = currSecond.Next;
            //    nextSecond = currSecond.Next;
            //}

            //// If either first or second is not present, nothing to do
            //if (currFirst == null || currSecond == null) { return; }

            //// If first is not head of linked list
            //if (prevFirst != null)
            //{
            //    prevFirst.Next = currSecond;
            //    currSecond.Prev = prevFirst;
            //}
            //else // make second the new head
            //{
            //    var nextHead = this.head.Next;
            //    currSecond.Next = nextHead;

            //    if (nextHead != null) { nextHead.Prev = currSecond; }

            //    this.head = currSecond;
            //}

            //// If second is not head of linked list
            //if (prevSecond != null)
            //{
            //    prevSecond.Next = currFirst;
            //    currFirst.Prev = prevSecond;
            //}
            //else // make first the new head
            //{
            //    var nextHead = this.head.Next;
            //    currFirst.Next = nextHead;

            //    if (nextHead != null) { nextHead.Prev = currFirst; }

            //    this.head = currFirst;
            //}

            //// Swap next pointers
            //currFirst.Next = nextSecond;
            //currSecond.Next = nextFirst;

            //// Check for tail change
            //if (currFirst.Next == null)
            //{
            //    this.tail = currFirst;
            //}
            //else if (currSecond.Next == null)
            //{
            //    this.tail = currSecond;
            //}
        }
        public T FirstOrDefault(Predicate<T> predicate)
        {
            foreach (var element in this)
            {
                if (predicate(element)) { return element; }
            }

            return default;
        }
        public void ForEach(Action<T> action)
        {
            foreach (var element in this)
            {
                action(element);
            }
        }
        public DoublyLinkedList<T> Where(Predicate<T> predicate)
        {
            var newList = new DoublyLinkedList<T>();

            foreach (var element in this)
            {
                if (predicate(element)) { newList.AddLast(element); }
            }

            return newList;
        }
        /// <summary>
        /// Removes matching elements and returns their count
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public int RemoveWhere(Predicate<T> predicate)
        {
            var count = 0;
            var i = 0;

            Node<T> prev = null, curr = this.head, next = null;
            while (curr != null)
            {
                if (predicate(curr.Value))
                {
                    if (i == 0)
                    {
                        this.RemoveFirst();
                        count++;
                        curr = this.head;
                        continue;
                    }
                    else if (i == this.Count - 1)
                    {
                        this.RemoveLast();
                        count++;
                        break;
                    }

                    var newCurr = curr.Next;
                    // This might be meaningless, I'm not quite sure if curr is going to 
                    // be deleted from the memory without it
                    curr.Next = null;
                    curr.Prev = null;
                    this.Count--;
                    count++;

                    curr = newCurr;

                    if (prev != null) { prev.Next = next; }
                    if (next != null) { next.Prev = prev; }
                }
                else { curr = curr.Next; }

                i++;

                if (curr != null)
                {
                    prev = curr.Prev;
                    next = curr.Next;
                }
            }

            return count > 0 ?
                count :
                throw new InvalidOperationException();
        }
        public T[] ToArray()
        {
            var arr = new T[this.Count];
            var cnt = 0;

            foreach (var element in this)
            {
                arr[cnt++] = element;
            }

            return arr;
        }
        public List<T> ToList()
        {
            var list = new List<T>(this.Count);
            foreach (var element in this)
            {
                list.Add(element);
            }

            return list;
        }

        public IEnumerator<T> GetEnumerator()
        {
            var curr = this.head;
            while (curr != null)
            {
                yield return curr.Value;
                curr = curr.Next;
            }
        }
        IEnumerator IEnumerable.GetEnumerator()
            => this.GetEnumerator();
        public override string ToString()
        {
            var sb = new StringBuilder();

            foreach (var element in this)
            {
                sb.AppendLine(element.ToString());
            }

            if (sb.Length == 0) { return "Browser history is empty!"; }

            return sb.ToString();
        }

        private void EnsureNotEmpty()

        {
            if (this.Count == 0)
            {
                throw new InvalidOperationException();
            }
        }
        private bool AreEqual(Node<T> first, Node<T> second)
        {
            return first.Value.Equals(second.Value);
        }
        private bool AreEqual(T first, T second)
        {
            return first.Equals(second);
        }
        private bool AreEqual(Node<T> first, T second)
        {
            return first.Value.Equals(second);
        }
        private bool AreEqualNodes(Node<T> first, Node<T> second)
        {
            return first.Equals(second);
        }
        private void ValidateIndex(int index)
        {
            if (index > 0 || index >= this.Count)
            {
                throw new ArgumentOutOfRangeException();
            }
        }
    }
}
