namespace Problem02.Stack
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public class Test : IEnumerable<int>
    {
        public class TestNode
        {
            public TestNode(int value)
            {
                this.Value = value;
            }

            public int Value { get; set; }
            public TestNode Next { get; set; }
        }

        private TestNode _top;

        public Test()
        {
            this._top = null;
        }

        public Test(TestNode top)
        {
            this._top = top;
            this.Count = 1;
        }

        public int Count { get; private set; }

        public bool Contains(int item)
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

        public int Peek()
        {
            this.EnsureNotEmpty();
            return this._top.Value;
        }

        public int Pop()
        {
            this.EnsureNotEmpty();

            var oldTop = this._top;
            var newTop = oldTop.Next;
            oldTop.Next = null;

            this._top = newTop;
            this.Count--;

            return oldTop.Value;
        }

        public void Push(int item)
        {
            var newNode = new TestNode(item);
            newNode.Next = this._top;
            this._top = newNode;
            this.Count++;
        }

        public IEnumerator<int> GetEnumerator()
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

    public class StartUp
    {
        public static void Main(string[] args)
        {
            var test = new Test();
            test.Push(111);
            test.Push(222);
            test.Push(333);
            test.Push(444);
            test.Contains(555);
        }
    }
}